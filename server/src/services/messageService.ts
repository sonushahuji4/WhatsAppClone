import { IMessage } from "../models/message";
import Message from "../mongooseDB/schemas/message";

export class MessageService {

    /** If user already exist then return the same else create a new user */
    public static getChatHistory = async (messageData:IMessage) => {
        try {
            return await Message.find({senderId: messageData.senderId, receiverId: messageData.receiverId});
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // /** Get all users details for chat */
    // public static addChats = async () => {
    //     try {
    //         return await User.find({});
    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     }
    // }
}