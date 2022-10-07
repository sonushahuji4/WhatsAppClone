import userImage from '../static/images/markZakarburk.jpg';
import emojiIcon from '../static/images/emojiIcon.svg';
import { messagesList } from '../mockData';

const ChatBox = () => {

    const getUserInfo = () => {
        return (
            <div className='user-profile-header'>
                <div className='user-image'>
                    <img src={userImage} alt="Img Not Found"></img>
                </div>
                <div className='user-name'>
                    Mark Zakerburk
                </div>    
            </div>
        );
    }

    const getChatHolder = () => {
        return (
            <div className='message-container' key="chat-box">
                {
                    messagesList.map((item: any) => {
                        return (
                            <div className='message-body-holder' style={{["--message-aligment" as string]: item.senderID ? "flex-start" : "flex-end"}}>
                            <div className='message'style={{["--background-color" as string]: item.senderID ? "#ffffff" : "#daf8cb"}}>{item.text}</div>
                        </div>
                        );
                    })
                }
            </div>
        );
    }

    const getMessageHolder = () => {
        return (
            <div className='chat-footer'>
                <div className='chat-footer-body'>
                    <div className='chat-input-holder'>
                        <div className='emoji-container'>
                            <img src={emojiIcon} alt="Img Not Found"></img>
                        </div>
                        <div className='chat-input'>
                            <input type="text" name="message-text" placeholder='Type a message'></input>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className='chat-container'>
            {getUserInfo()}
            {getChatHolder()}
            {getMessageHolder()}
        </div>
    );
}

export default ChatBox;