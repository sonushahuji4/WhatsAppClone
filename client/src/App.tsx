import { useContext, useEffect } from 'react';
import './styles/App.scss';
import ContactList from './components/shared/contacts/contacts';
import Conversation from './components/shared/conversation/conversation';
import LandingWindow from './components/landingWindow';
import { GoogleOAuthProvider } from '@react-oauth/google';
import useContact from './hooks/useContact';
import { io, Socket} from 'socket.io-client';
import { GlobalStateContext } from './context/GlobalContextProvider';
import { SOCKET_STRINGS } from './constants/contant';
import WhatsAppWeb from './components/shared/whatsAppWeb';
import { message } from './models/user';
import { SERVER_API } from '../src/constants/contant';

const App = () => {
  const clientId = '894720398292-60h39t5cbgnk1ens4p7p21mtgrb3fmk9.apps.googleusercontent.com';
  const socket: Socket = io(`${SERVER_API}/`,{ transports: ['websocket']});
  const stateContext: any = useContext(GlobalStateContext);
  const {selectedUser, onContactSelect, chatHistory, setChatHistory}: any = useContact(socket);

  useEffect(() => {
    if(socket){
        socket.on(SOCKET_STRINGS.ACKNOWLEDMENT, (msg: message) => {
            setChatHistory((list: message[]): message[] => [...list, msg]);
        })
    }
  },[socket]);

  const getComponent = () => {
    if(stateContext.authorDetails?.userId && stateContext.authorDetails?.email){
      return (
        <div className='container'>
            <div className='container-header'>

            </div>
            <div className='container-body'>
              <div className='container-holder'>
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
              </div>
            </div>
        </div>
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
