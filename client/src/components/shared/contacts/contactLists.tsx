import { useContext } from "react";
import { GlobalStateContext } from "../../../context/GlobalContextProvider";
import { user } from "../../../models/user";

interface Props {
    onContactSelect : (item: user) => void;
}

const ContactLists = ({onContactSelect}: Props): JSX.Element => {
    const stateContext: any = useContext(GlobalStateContext);
    return (
        stateContext.usersContactList.map((item: any) => {
          return (
          <div className='users-contact-lists' 
              key={item.userId} 
              onClick={(event) => {onContactSelect(item)}}>
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

export default ContactLists;