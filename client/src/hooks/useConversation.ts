import { useState, useContext } from 'react';
import { Socket } from 'socket.io-client';
import { GlobalStateContext } from '../context/GlobalContextProvider';
import { user, message } from '../models/user';
import { WebSocket } from '../socket/webSocket';

const useConversation = (socket: Socket) => {
    const stateContext: any = useContext(GlobalStateContext);
    const [currentMessage, setCurrnetMessage] = useState<any>('');

    /** Send request to server to store message in database */
    const sendMessage = (event:React.KeyboardEvent<HTMLInputElement>, props: user) => {
        const keyCode: number = event.keyCode || event.which;
        if(currentMessage !== '' && keyCode === 13){
            setCurrnetMessage('');
            const message: message = {
                senderId : stateContext.authorDetails.userId,
                receiverId : props.userId,
                msg : currentMessage
            };
            WebSocket.dispatchRequest(socket,message);
        }
    }

    return {
        currentMessage,
        setCurrnetMessage,
        sendMessage
    };
}

export default useConversation;