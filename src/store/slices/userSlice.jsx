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
        editUser(state,action){
            
        },
        removeUser(state,action){
            state.userData={}
        }
    }
}
);
export default UserSlice.reducer;
export const  {addUser,removeUser} = UserSlice.actions;