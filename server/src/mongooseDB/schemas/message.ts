import mongoose from "mongoose";
import { message } from "../../models/message";

/** define a schema for a user */
const messageSchema = new mongoose.Schema<message>({
    senderId : {
        type: String,
        required: true
    },
    uniqueId : {
        type: String,
        required: true
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