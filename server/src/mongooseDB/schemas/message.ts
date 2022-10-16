import mongoose from "mongoose";
import { IMessage } from "../../models/message";

/** define a schema for a user */
const messageSchema = new mongoose.Schema<IMessage>({
    senderId : {
        type: String,
        required: true
    },
    receiverId : {
        type: String,
        required: true
    },
    messageId : {
        type: String,
        required: false
    },
    uniqueId : {
        type: String,
        required: false
    },
    msg : {
        type : String
    },
},
{
    timestamps : true
});

/** create a actual model in database using the schema  */
const message = mongoose.model('message',messageSchema);

export default message;