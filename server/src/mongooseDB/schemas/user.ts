import mongoose from "mongoose";
import { IUser } from "../../models/user";

/** define a schema for a user */
const userSchema = new mongoose.Schema<IUser>({
    userId : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    email : {
        type : String
    },
    email_verified : {
        type: Boolean
    },
    picture : {
        type : String,
        required : true
    }
});

/** create a actual model in database using the schema  */
const user = mongoose.model('users',userSchema);

export default user;