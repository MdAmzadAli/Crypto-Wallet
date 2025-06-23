
import { useDispatch } from 'react-redux';
import { queueManager } from '../utils/queue-manager';
import type { AppDispatch } from '../state/store';

export const useInitQueueManager = () => {
  const dispatch = useDispatch<AppDispatch>();
   queueManager.setDispatch(dispatch);
  //  queueManager.processBalanceQueue();
  //  queueManager.processHistoryQueue();
};