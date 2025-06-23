import {createSlice} from '@reduxjs/toolkit';

interface TransactionState{
    date:string,
    time:string,
    wallet:string,
    amount:string|number,
    result:"RECEIVED"|"SENT",
    status:"SUCCESS"|"FAILED",
}

const initialState: TransactionState[] = [];

const transaction=createSlice({
    name:"transaction",
    initialState,
    reducers:{
        add:(state,action)=>{
            const {date,time,wallet,amount,result,status}=action.payload;
            
            state.unshift({date,time,wallet,amount,result,status});
        },
        clear:()=>{
            return initialState;
        }
    }
});
export const {add,clear}=transaction.actions;
export default transaction.reducer;