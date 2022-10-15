import { useState, useEffect, useContext } from "react";
import { chatsIDs, user } from "../models/user";
import { APIServices } from "../services/apiServices";
import { GlobalDispatchContext, GlobalStateContext } from '../context/GlobalContextProvider';
import * as actions from '../context/actions';
import { Socket } from 'socket.io-client';
import { WebSocket } from "../socket.ts/webSocket";


const useContact = (socket: Socket) => {
    const stateContext: any = useContext(GlobalStateContext);
    const dispatch: any = useContext(GlobalDispatchContext);
    const [selectedUser, setSelectedUser] = useState({});
    const [privousSelectedUser, setPrivousSelectedUser] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const onContactSelect = async (props: user) => {
        if(props.userId !== privousSelectedUser){
            setPrivousSelectedUser(props.userId);
            /** Fetch chat history for the selected user from the server */
            WebSocket.subscribe(socket,{
                senderId : stateContext.authorDetails.userId,
                receiverId : props.userId,
            })
            setSelectedUser(props);
        }   
    }

    useEffect(() => {
        if(socket){
            /** Receive chat history from the server for the selected user */
            socket.on('chatHistory', (chatHistoryDetails: any) => {
                setChatHistory(chatHistoryDetails);
            })
        }
      },[socket]);

    return {
        chatHistory,
        setChatHistory,
        selectedUser,
        onContactSelect
    }

}

export default useContact;