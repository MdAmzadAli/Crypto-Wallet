import {createSlice} from '@reduxjs/toolkit'

interface statusState{
    value:"idle"|"synced"|"syncing"
}

const initialState: statusState={value:"idle"};

const status=createSlice({
    name:"status",
    initialState,
    reducers:{
        setStatus:(state,action)=>{
            state.value=action.payload;
        }
        
    }
});

export const {setStatus}=status.actions;
export default status.reducer;