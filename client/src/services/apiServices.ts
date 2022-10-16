import axios from 'axios';
import { chatsIDs, user } from '../models/user';
// import dotenv from 'dotenv';
// dotenv.config()

export class APIServices {

    public static URL = 'http://localhost:3001';

    public static addUser = async (porps: user) => {
        try {
            const promises = [];
            promises.push(axios.post(`${this.URL}/addUser`,porps));
            promises.push(axios.get(`${this.URL}/getUsers`));
            const [user, usersList]: any = await Promise.all(promises);
            if(user.status != 200 && !user.data || usersList.status != 200 || !usersList.data){
                throw ('Error while calling getUsers API');
            }
            return [user.data, usersList.data];

        } catch (error: any) {
            console.log('Error while calling addUser API : ',error.message);
            throw error;
        }
    }

    public static getUsers = async () => {
        try {
            const result = await axios.get(`${this.URL}/getUsers`);
            if(result.status != 200 || !result.data){
                throw ('Error while calling getUsers API');
            }
            return result.data;
        } catch (error: any) {
            console.log('Error while calling getUsers API : ',error.message);
            throw error;
        }
    }
}