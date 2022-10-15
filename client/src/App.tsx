import { useContext, useEffect } from 'react';
import './styles/App.scss';
import ContactList from './components/shared/contacts/contacts';
import Conversation from './components/shared/conversation/conversation';
import LandingWindow from './components/landingWindow';
import { GoogleOAuthProvider } from '@react-oauth/google';
import useContact from './hooks/useContact';
import { io, Socket} from 'socket.io-client';
import { GlobalDispatchContext, GlobalStateContext } from './context/GlobalContextProvider';
import { SOCKET_STRINGS } from './constants/contant';
import WhatsAppWeb from './components/shared/whatsAppWeb';

const App = () => {
  const clientId = '894720398292-60h39t5cbgnk1ens4p7p21mtgrb3fmk9.apps.googleusercontent.com';
  const socket: Socket = io('http://localhost:3001/',{ transports: ['websocket']});
  const stateContext: any = useContext(GlobalStateContext);
  const dispatch: any = useContext(GlobalDispatchContext);
  const {selectedUser, onContactSelect, chatHistory, setChatHistory}: any = useContact(socket);

  useEffect(() => {
    if(socket){
        socket.on(SOCKET_STRINGS.ACKNOWLEDMENT, (mess: any) => {
            setChatHistory((list: any[]): any[] => [...list, mess]);
            console.log("sendMessage: ",mess);
        })
    }
  },[socket]);

  const getComponent = () => {
    if(stateContext.authorDetails?.userId && stateContext.authorDetails?.email){
      return (
        <>
          <ContactList 
            onContactSelect={onContactSelect}/>
          { 
            Object.keys(selectedUser).length ? 
                <Conversation 
                  selectedUser={selectedUser} 
                  socket={socket} 
                  chatHistory={chatHistory}/> 
              : 
                <WhatsAppWeb /> 
          }
        </>
      )
    }
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <LandingWindow socket={socket}/>
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
