import axios from 'axios';
import { user } from '../models/user';
import { SERVER_API } from '../constants/contant';
// import dotenv from 'dotenv';
// dotenv.config()

export class APIServices {

    public static addUser = async (porps: user) => {
        try {
            const promises = [];
            promises.push(axios.post(`${SERVER_API}/addUser`,porps));
            promises.push(axios.get(`${SERVER_API}/getUsers`));
            const [user, usersList]: any = await Promise.all(promises);
            if((user.status !== 200 && !user.data) || (usersList.status !== 200 || !usersList.data)){
                throw ({err:'Error while calling getUsers API'});
            }
            return [user.data, usersList.data];

        } catch (error: any) {
            console.log('Error while calling addUser API : ',error.message);
            throw error;
        }
    }

    public static getUsers = async () => {
        try {
            const result = await axios.get(`${SERVER_API}/getUsers`);
            if(result.status !== 200 || !result.data){
                throw ({err:'Error while calling getUsers API'});
            }
            return result.data;
        } catch (error: any) {
            console.log('Error while calling getUsers API : ',error.message);
            throw error;
        }
    }
}