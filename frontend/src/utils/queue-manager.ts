
import axios from 'axios';
import { parseTransactions } from './parse-transaction';
import type { AppDispatch } from '../state/store'; 
import { add } from '../state/slices/wallet';
import { add as addToTransaction } from '../state/slices/transaction';
import { formatTime } from './format-time';
import { setStatus } from '../state/slices/status';

interface BalanceQueueItem {
  name: string;
  address: string;
}

interface HistoryQueueItem {
  address: string;
}
const MAX_RETRIES = 3;           
const RETRY_BACKOFF_MS = 500;    
const ITEM_DELAY_MS = 200;       
const STATUS_RESET_MS = 2000;

class QueueManager {
  private balanceQueue: BalanceQueueItem[] = [];
  private historyQueue: HistoryQueueItem[] = [];
  private isProcessingBalance = false;
  private isProcessingHistory = false;
  private dispatch?: AppDispatch; 

  setDispatch(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }
  private isSyncingDone(){
    if( (!this.isProcessingBalance)&&(!this.isProcessingHistory)){
     if(!this.dispatch) throw new Error("Dispatch not initialized");
     this.dispatch(setStatus("synced"));
     const dispatch = this.dispatch;
     setTimeout(()=> dispatch(setStatus("idle")),STATUS_RESET_MS);
     
    };
  }
  addToBalanceQueue(item: BalanceQueueItem) {
    this.balanceQueue.push(item);
    this.scheduleBalanceProcessing();
  }

  addToHistoryQueue(item: HistoryQueueItem) {
    this.historyQueue.push(item);
    this.scheduleHistoryProcessing();
  }

  private scheduleBalanceProcessing() {
    if (this.isProcessingBalance) return;
    this.processBalanceQueue();
  }

  private scheduleHistoryProcessing() {
    if (this.isProcessingHistory) return;
    this.processHistoryQueue();
  }

  private async processBalanceQueue() {
    if (!this.dispatch) {
      console.error("Dispatch not set in QueueManager!");
      return;
    }
    this.isProcessingBalance = true;
    this.dispatch(setStatus("syncing"));

    const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

    while (this.balanceQueue.length > 0) {
      const item = this.balanceQueue.shift()!;  
      let attempt = 0;
      let succeeded = false;

      
      while (attempt < MAX_RETRIES && !succeeded) {
        try {
          await this.fetchBalance(item.name, item.address);
          succeeded = true;
        } catch (error) {
          attempt++;
          console.error(
            `Balance fetch failed for ${item.address} (attempt ${attempt}/${MAX_RETRIES}):`,
            error
          );
          if (attempt < MAX_RETRIES) {
            
            await delay(RETRY_BACKOFF_MS);
          }
        }
      }

      if (!succeeded) {
        console.warn(
          `Giving up on ${item.address} after ${MAX_RETRIES} attempts.`
        );
      }

      await delay(ITEM_DELAY_MS);
    }
    if(this.balanceQueue.length>0){
      this.processBalanceQueue();
    }
    this.isProcessingBalance = false;
    this.isSyncingDone();
  }

   private async processHistoryQueue() {
    if (!this.dispatch) {
      console.error("Dispatch not set in QueueManager!");
      return;
    }
    this.isProcessingHistory = true;
    this.dispatch(setStatus("syncing"));

    const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

    while (this.historyQueue.length > 0) {
      const item = this.historyQueue.shift()!;
      let attempt = 0;
      let succeeded = false;

      while (attempt < MAX_RETRIES && !succeeded) {
        try {
          await this.fetchHistory(item.address);
          succeeded = true;
        } catch (error) {
          attempt++;
          console.error(
            `History fetch failed for ${item.address} (attempt ${attempt}/${MAX_RETRIES}):`,
            error
          );
          if (attempt < MAX_RETRIES) {
            await delay(RETRY_BACKOFF_MS);
          }
        }
      }

      if (!succeeded) {
        console.warn(
          `Giving up on history for ${item.address} after ${MAX_RETRIES} attempts.`
        );
      }

      await delay(ITEM_DELAY_MS);
    }
if(this.historyQueue.length>0){
      this.processHistoryQueue();
    }
    this.isProcessingHistory = false;
    this.isSyncingDone();
  }

  private async fetchBalance(name: string, address: string) {
    if (!this.dispatch) throw new Error("Dispatch not initialized");
    const resp = await axios.get(
      `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`
    );
    const balance = resp.data.balance / 1e8;
    this.dispatch(add({ name, amount: balance, address }));
  }

  private async fetchHistory(address: string) {
    const resp = await axios.get(
      `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full?limit=5`
    );
    const transactions = resp.data.txs;
    const txs = parseTransactions(transactions, address);
    for (const tx of txs) {
      const { date, time } = formatTime(tx.date);
      this.dispatch?.(
        addToTransaction({
          date,
          time,
          wallet: tx.wallet,
          amount: tx.amount.toString(),
          result: tx.result,
          status: tx.success ? "SUCCESS" : "FAILED",
        })
      );
    }
  }
}

export const queueManager = new QueueManager();
