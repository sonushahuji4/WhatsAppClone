import { IMessage } from "../models/message";
import { MessageService } from "../services/messageService";

export class MessageController {

    /** Validdate message and check all the required attributes */
    public getChatHistory = async (messageData: any) => {
        try {
            return await MessageService.getChatHistory(messageData); 
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}