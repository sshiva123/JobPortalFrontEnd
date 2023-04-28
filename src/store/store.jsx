import  { configureStore } from "@reduxjs/toolkit";
import  UserSlice  from "./slices/userSlice";
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";


const rootReducer=combineReducers({
  
})

 export const store = configureStore({
    reducer: {
      user:UserSlice
    }
  })

