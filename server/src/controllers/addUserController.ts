import { IUser } from "../models/user";
import { AddUserService } from "../services/addUserService";

export class AddUserController {

    /** Validdate user and check all the required attributes */
    public addUser = async (userData: any) => {
        try {
            const user: IUser = this.mapUser(userData);
            const validationRes = this.isUserValid(user);
            if(!validationRes.isValid){
                throw new Error(validationRes.errors.join("\n"));
            }
            return await AddUserService.AddUser(user); 
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    /** Get all users details */
    public getUsers = async () => {
        try {
            return await AddUserService.getUsers(); 
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    private mapUser = (userData : any) =>{
        const { userId, name, email, email_verified, picture }= userData;
        return { userId, name, email, email_verified, picture };
    }

    private isUserValid = (user: IUser) => {
        const errors = []
        if(!user.userId){
            errors.push("Please provide user Id");
        }
        if(!user.name){
            errors.push("Please provide user name");
        }
        if(!user.email){
            errors.push("Please provide user email");
        }
        if(!user.picture){
            errors.push("Please provide user picture");
        }
        return { isValid : errors.length == 0, errors };
    }
}