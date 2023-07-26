import { createSlice } from "@reduxjs/toolkit";
import store from "../store";

const UserSlice=createSlice(
{
    name:"user",
    initialState:{userData:{}},
    reducers:{
        addUser(state,action){
            state.userData=action.payload;
        },
        savedJobs(state,action){
            if(state.userData.savedJobs.indexOf(action.payload)>-1){
                state.userData.savedJobs=state.userData.savedJobs.filter(_id=>_id!==action.payload);
            }else{
                state.userData.savedJobs=[...state.userData.savedJobs,action.payload];
            }
        },
        appliedJobs(state,action){
            if(state.userData.appliedJobs.indexOf(action.payload)>-1){
                state.userData.appliedJobs=state.userData.appliedJobs.filter(job=>job!==action.payload)
            }else{
                state.userData.appliedJobs=[...state.userData.appliedJobs,action.payload]
            }
        },
        editUser(state,action){
            
        },
        removeUser(state,action){
            state.userData={} 
        }
    }
}
);
export default UserSlice.reducer;
export const  {addUser,removeUser,savedJobs,appliedJobs} = UserSlice.actions;