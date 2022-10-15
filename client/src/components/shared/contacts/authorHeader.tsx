import { useContext } from "react";
import { GlobalStateContext } from "../../../context/GlobalContextProvider";

const AuthorHeader = (): JSX.Element => {
    const stateContext: any = useContext(GlobalStateContext);
    return (
        <div className='author-profile-info'>  
            <div className='author-image'>
                <img src={stateContext.authorDetails.picture} alt="Img Not Found"></img>
            </div>
        </div>
    );
}

export default AuthorHeader;