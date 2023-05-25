import React from 'react';
import address from './address';
import io from "socket.io-client";

export const socket = io("ws://"+address+':3030');
export const SocketContext = React.createContext();