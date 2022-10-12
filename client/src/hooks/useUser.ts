import { useContext } from 'react';
import { APIServices } from '../services/apiServices';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';
import * as actions from '../context/actions';
import jwt_decode from "jwt-decode";
import { user } from '../models/user';

const useUser = () => {
    const dispatch: any = useContext(GlobalDispatchContext);

    const onLoginSuccess = async (res: any) => {
        try {
            const decodeCredential: any = jwt_decode(res.credential);
            const userObj:user = {
                userId : decodeCredential.sub,
                name : decodeCredential.name,
                email : decodeCredential.email,
                email_verified : decodeCredential.email_verified,
                picture: decodeCredential.picture
            } 

            const [user, userList]: any = await APIServices.addUser(userObj);
            dispatch({
                type : actions.AUTHOR_DETAILS,
                payload : {
                    user,
                    userList
                }
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const onLoginError = () => {
        throw ('Login failed');
    }

    return{
        onLoginSuccess,
        onLoginError
    }
}
export default useUser;