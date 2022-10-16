import { user } from '../../../models/user';
import emojiIcon from '../../../static/images/emojiIcon.svg';

interface Props {
    selectedUser : user
    currentMessage : string;
    setCurrnetMessage: any;
    sendMessage: (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>, selectedUser: user, status: boolean) => void;
}

const ConversationFooter = ({selectedUser, currentMessage, setCurrnetMessage, sendMessage} : Props): JSX.Element => {
    return (
        <div className='conversation-footer'>
            <div className='chat-footer-body'>
                <div className='chat-input-holder'>
                    <div className='emoji-container'>
                        <img src={emojiIcon} alt="Img Not Found"></img>
                    </div>
                    <div className='chat-input'>
                        <input 
                            type="text" 
                            name="message-text" 
                            value={currentMessage}
                            placeholder='Type a message' 
                            onChange={(e)=> setCurrnetMessage(e.target.value)}
                            onKeyPress={(event) => {sendMessage(event,selectedUser, false)}}/>
                    </div>
                    <div className='send-btn'>
                        <button onClick={(event) => {sendMessage(event,selectedUser, true)}}>&#9658;</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConversationFooter;