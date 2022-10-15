import userImage from '../static/images/markZakarburk.jpg';
import emojiIcon from '../static/images/emojiIcon.svg';
// import { messagesList } from '../mockData';
import ConversationHeader from './conversationHeader';
import { GlobalStateContext } from '../../../context/GlobalContextProvider';
import { useContext, useEffect, useState, useRef } from 'react';
import { Socket} from 'socket.io-client';
import ConversationBody from './conversationBody';
import ConversationFooter from './conversatioFooter';
import useConversation from '../../../hooks/useConversation';
import { user } from '../../../models/user';

interface Props{
    socket : Socket;
    chatHistory: [];
    selectedUser : user;
}

const Conversation = ({selectedUser, socket, chatHistory} : Props) => {
    const {currentMessage, setCurrnetMessage, sendMessage } = useConversation(socket);
    const stateContext: any = useContext(GlobalStateContext);

    return (
        <div className='conversation-container'>
            <ConversationHeader selectedUser={selectedUser}/>
            
            <ConversationBody 
                authorId={stateContext.authorDetails.userId} 
                chatHistory={chatHistory}/>

            <ConversationFooter 
                selectedUser={selectedUser}
                currentMessage={currentMessage} 
                setCurrnetMessage={setCurrnetMessage} 
                sendMessage={sendMessage}/>
        </div>
    );
}

export default Conversation;