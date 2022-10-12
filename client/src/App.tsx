import { useState, useContext } from 'react';
import './styles/App.scss';
import ContactList from './components/contactList';
import ChatBox from './components/chatBox';
import LandingWindow from './components/landingWindow';
import homePageImge from '../src/static/images/homepage.jpeg';
import { messagesList } from './mockData';
import { GlobalStateContext } from './context/GlobalContextProvider';
import * as actions from './context/actions';
import { GoogleOAuthProvider } from '@react-oauth/google';
import * as dotenv from 'dotenv';


const App = () => {
  
  const stateContext: any = useContext(GlobalStateContext);
  // dotenv.config()
  const [selectedChat, setSelectedChat] = useState<any>([]);
  const clientId = '894720398292-60h39t5cbgnk1ens4p7p21mtgrb3fmk9.apps.googleusercontent.com'
  //console.log(" ......................",process.env.GoogleClientId);
  
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

  const getComponent = () => {
    if(stateContext.authorDetails?.userId && stateContext.authorDetails?.email){
      return (
        <>
          <ContactList getSelectedChat={getSelectedChat} />
          <ChatBox/>
        </>
      )
    }
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <LandingWindow />
      </GoogleOAuthProvider>
    )
  }

  return (
    <div className="main-container">
      {getComponent()}
    </div>
  );
}

export default App;
