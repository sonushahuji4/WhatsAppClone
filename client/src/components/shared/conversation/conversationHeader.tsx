import { user } from "../../../models/user";

interface Props {
    selectedUser : user;
}
const ConversationHeader = ({selectedUser} : Props): JSX.Element => {
    return (
        <div className='conversation-header'>
            <div className='user-image'>
                <img src={selectedUser.picture} alt="Img Not Found"></img>
            </div>
            <div>
                <div className='user-name'>{selectedUser.name}</div>  
                <div className="status-off-on-lin">{null}</div> 
            </div>
        </div>
    );
}

export default ConversationHeader;