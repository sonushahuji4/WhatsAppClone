import { IUser } from "../models/user";
import User from "../mongooseDB/schemas/user";

export class AddUserService {

    /** If user already exist then return the same else create a new user */
    public static AddUser = async (userData:IUser) => {
        try {
            const existingUser = await User.findOne({userId: userData.userId});
            if(existingUser){
                return existingUser;
            }
            return await (new User(userData)).save();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /** Get all users details for chat */
    public static getUsers = async () => {
        try {
            return await User.find({});
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}