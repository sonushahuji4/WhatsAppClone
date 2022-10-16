import { useState, useContext } from 'react';
import { Socket } from 'socket.io-client';
import { GlobalStateContext } from '../context/GlobalContextProvider';
import { WebSocket } from '../socket/webSocket';

const useConversation = (socket: Socket) => {
    const stateContext: any = useContext(GlobalStateContext);
    const [currentMessage, setCurrnetMessage] = useState<any>('');

    /** Send request to server to store message in database */
    const sendMessage = (event:React.KeyboardEvent<HTMLInputElement>, props: any) => {
        const keyCode: number = event.keyCode || event.which;
        if(currentMessage !== '' && keyCode === 13){
            setCurrnetMessage('');
            WebSocket.dispatchRequest(socket,{
                senderId : stateContext.authorDetails.userId,
                receiverId : props.userId,
                msg : currentMessage
            });
        }
    }

    return {
        currentMessage,
        setCurrnetMessage,
        sendMessage
    };
}

export default useConversation;