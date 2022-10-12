import searchIcon from '../static/images/searchIcon.svg';
import { useContext } from 'react';
import { GlobalStateContext } from '../context/GlobalContextProvider';

interface Prpos {
    getSelectedChat : (id: number) => void;
}
const ContactList = ({getSelectedChat}: Prpos) => {
    const stateContext: any = useContext(GlobalStateContext);


    const getAuthorInfo = () => {
        return (
            <div className='author-profile-info'>  
                <div className='author-image'>
                    <img src={stateContext.authorDetails.picture} alt="Img Not Found"></img>
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
                <div className='users-contact-lists' key={item.userId} onClick={(event) => {getSelectedChat(item.userId)}}>
                    <div className='user-image'>
                        <img src={item.picture} alt="Img Not Found"></img>
                    </div>
                    <div className='contact-info'>
                        <div className='user-name'>{item.name}</div>
                        <div className='message-text'>{item?.lastText}</div>
                    </div>
                    <div className='last-message-time'>{item?.lastTextTime}</div>
                </div>);
            })
        );
    }

    return (
        <div className='contact-list-container'> 
            {getAuthorInfo()}
            {getSearchBar()}
            {getContactList(stateContext.usersContactList)}
        </div>
    );
}

export default ContactList;