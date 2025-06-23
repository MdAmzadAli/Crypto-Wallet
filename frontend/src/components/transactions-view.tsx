
import { ArrowDown, ArrowUp } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "../state/store"

// interface Transaction {
  
//   date: string
//   time: string
//   wallet: string
//   amount: string
//   result: "RECEIVED" | "SENT"
//   status: "SUCCESS" | "PENDING" | "FAILED"
// }

export function TransactionsView() {
  // const [transactions, setTransactions] = useState<Transaction[]>([
  //   {
     
  //     date: "12/11/2020",
  //     time: "10:31:20 AM",
  //     wallet: "Aru",
  //     amount: "0.5268 BTC",
  //     result: "RECEIVED",
  //     status: "SUCCESS",
  //   },
  //   {
      
  //     date: "12/11/2020",
  //     time: "10:31:20 AM",
  //     wallet: "Aru",
  //     amount: "0.5268 BTC",
  //     result: "RECEIVED",
  //     status: "SUCCESS",
  //   },
  //   {
      
  //     date: "12/11/2020",
  //     time: "10:31:20 AM",
  //     wallet: "Aru",
  //     amount: "0.5268 BTC",
  //     result: "RECEIVED",
  //     status: "SUCCESS",
  //   },
  //   {
      
  //     date: "12/11/2020",
  //     time: "10:31:20 AM",
  //     wallet: "Aru",
  //     amount: "0.5268 BTC",
  //     result: "RECEIVED",
  //     status: "SUCCESS",
  //   },
  //   {
     
  //     date: "12/11/2020",
  //     time: "10:31:20 AM",
  //     wallet: "Aru",
  //     amount: "0.5268 BTC",
  //     result: "RECEIVED",
  //     status: "SUCCESS",
  //   },
  //   {
      
  //     date: "12/11/2020",
  //     time: "10:31:20 AM",
  //     wallet: "Aru",
  //     amount: "0.5268 BTC",
  //     result: "RECEIVED",
  //     status: "SUCCESS",
  //   },
  // ])
  const transactions = useSelector(
    (state: RootState) => state.transaction
  );
  const handleWalletName = (name:string)=>{
    if(name.length>34){
      return name.slice(0,34)+"..."
    }
    else return name;
  }
  return (
    <div className="px-3 pb-3 mt-[60px] ">
      <div className={` rounded-lg p-4`}>
        <h1 className="text-[#C78D4E] text-lg font-medium mb-3">
            Transactions
        </h1>
        <div className="mt-[30px] ml-[20px]">
          <h2 className="text-white text-xs border-b-[1px] border-[#161C23]">
            Total Transactions - {transactions.length.toString().padStart(2, "0")}
          </h2>
        </div>
        <div className="grid grid-cols-5 gap-4 mt-4 text-xs text-gray-400 px-2">
          <div>Date</div>
          <div>Wallet</div>
          <div>Amount</div>
          <div>Result</div>
          <div>Status</div>
        </div>
        <div className="space-y-2 mt-3">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className={`grid grid-cols-5 gap-4 p-2 rounded-md items-center bg-[#161C23]`}
            >
              <div className="flex items-center">
                <div className="w-5 h-5 bg-amber-700 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-xs font-bold">₿</span>
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-white">{transaction.date}</div>
                  <div className="text-xs text-gray-500">{transaction.time}</div>
                </div>
              </div>
              <div className="text-xs text-white">{handleWalletName(transaction.wallet)}</div>
              <div className="text-xs text-white">{transaction.amount}</div>
              <div className="flex items-center">
                {transaction.result=="RECEIVED"&&
                (<><ArrowDown className="w-3 h-3 mr-1 text-purple-400" />
                <span className="text-xs text-purple-400">{transaction.result}</span></>)}
                     {transaction.result!="RECEIVED"&&
                (<><ArrowUp className="w-3 h-3 mr-1 text-orange-400" />
                <span className="text-xs text-orange-400">{transaction.result}</span></>)}
              </div>
              <div className="text-xs text-green-400">{transaction.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
