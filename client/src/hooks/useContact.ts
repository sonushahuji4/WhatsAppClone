import { useState, useEffect, useContext } from "react";
import { chatsIDs, user } from "../models/user";
import { GlobalStateContext } from '../context/GlobalContextProvider';
import { Socket } from 'socket.io-client';
import { WebSocket } from "../socket/webSocket";
import { SOCKET_STRINGS } from "../constants/contant";


const useContact = (socket: Socket) => {
    const stateContext: any = useContext(GlobalStateContext);
    const [selectedUser, setSelectedUser] = useState<object>({});
    const [privousSelectedUser, setPrivousSelectedUser] = useState<chatsIDs>({senderId: '', receiverId: ''});
    const [chatHistory, setChatHistory] = useState([]);

    const onContactSelect = async (props: user) => {
        if(props.userId !== privousSelectedUser?.receiverId){
            const iDs: chatsIDs = {
                senderId : stateContext.authorDetails.userId,
                receiverId : props.userId,
            };
            setPrivousSelectedUser(iDs);
            setSelectedUser(props);
            WebSocket.unSubscribe(socket,privousSelectedUser);
            /** Fetch chat history for the selected user from the server */
            WebSocket.subscribe(socket,iDs);
        }   
    }

    useEffect(() => {
        if(socket){
            /** Receive chat history from the server for the selected user */
            socket.on(SOCKET_STRINGS.CHAT_HISTORY, (chatHistoryDetails: any) => {
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