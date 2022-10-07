import React, { useState } from 'react';
import './styles/App.scss';
import ContactList from './components/contactList';
import ChatBox from './components/chatBox';
import homePageImge from '../src/static/images/homepage.jpeg';
import { messagesList } from './mockData';

const App = () => {
  const [selectedChat, setSelectedChat] = useState<any>([]);

  const getSelectedChat = (id: number) => {
    setSelectedChat(messagesList)
  }

  const getChatHolder = () => {
    return (
      <div className='home-chat'>
        <div className='chat-image'>
          <img src={homePageImge} alt="Imgae Not Found"></img>
        </div>
        <div className='context'>
          <span>Keep your phone connected</span><br />
          <p>WhatsApp connects to your phone to sync messages.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <ContactList getSelectedChat={getSelectedChat} />
      {
        selectedChat.length ? <ChatBox/> : getChatHolder()   
      }
    </div>
  );
}

export default App;
