import { configureStore } from "@reduxjs/toolkit";  
import walletReducer from './slices/wallet';
import transactionsReducer from './slices/transaction';
import State from './slices/status';
export const store =configureStore({
    reducer:{
        wallet: walletReducer,
        transaction: transactionsReducer,
        status:State
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
