import {createSlice} from '@reduxjs/toolkit'

interface WalletState{
    name:string,
    amount:string|number,
    address:string,
}

const initialState: WalletState[]=[];

const wallet=createSlice({
    name:"wallet",
    initialState,
    reducers:{
        add:(state,action)=>{
            const {name,address,amount}=action.payload;
            state.unshift({name,address,amount});    
        },
        clear:()=>{
            return initialState
        },
        deleteWallet:(state,action)=>{
            const {address}=action.payload;
            return state.filter((wallet)=>wallet.address!==address);
        }
        
    }
});

export const {add,clear,deleteWallet}=wallet.actions;
export default wallet.reducer;