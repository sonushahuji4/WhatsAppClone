import authorImage from '../static/images/author.jpg';
import searchIcon from '../static/images/searchIcon.svg';
import userImage from '../static/images/markZakarburk.jpg';
import { contactList } from '../mockData';


interface Prpos {
    getSelectedChat : (id: number) => void;
}
const ContactList = ({getSelectedChat}: Prpos) => {

    const getAuthorInfo = () => {
        return (
            <div className='author-profile-info'>  
                <div className='author-image'>
                    <img src={authorImage} alt="Img Not Found"></img>
                </div>
            </div>
        );
    }

    const getSearchBar = () => {
        return (
            <div className='search-container'>
                <div className='search'>
                    <div className='search-icon'>
                        <img src={searchIcon} alt="Img Not Found"></img>
                    </div>
                    <div className='search-input'>
                        <input type="text" name="search-text" placeholder='Search or Start a new chat'></input>
                    </div>
                </div>
            </div>
        );
    }

    const getContactList = (contactList: any) => {
        return (
              contactList.map((item: any) => {
                return (
                <div className='users-contact-lists' onClick={(event) => {getSelectedChat(item.id)}} key={item.id}>
                    <div className='user-image'>
                        <img src={userImage} alt="Img Not Found"></img>
                    </div>
                    <div className='contact-info'>
                        <div className='user-name'>{item.name}</div>
                        <div className='message-text'>{item.lastText}</div>
                    </div>
                    <div className='last-message-time'>{item.lastTextTime}</div>
                </div>);
            })
        );
    }

    return (
        <div className='contact-list-container'> 
            {getAuthorInfo()}
            {getSearchBar()}
            {getContactList(contactList)}
        </div>
    );
}

export default ContactList;