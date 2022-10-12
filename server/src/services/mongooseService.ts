import mongoose  from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export class MongooseService {

    public static databaseIntance : mongoose.Connection;
    public static URL = `mongodb://${process.env.RDS_DATABASE_USER}:${process.env.RDS_DATABASE_PASSWORD}@ac-pdavthj-shard-00-00.pimsw86.mongodb.net:27017,ac-pdavthj-shard-00-01.pimsw86.mongodb.net:27017,ac-pdavthj-shard-00-02.pimsw86.mongodb.net:27017/?ssl=true&replicaSet=atlas-botrzi-shard-0&authSource=admin&retryWrites=true&w=majority`;
        
    /** Establish connection with Mongoose databse */
    public static init = async () => {

        try { 

            if(MongooseService.databaseIntance) return;

            mongoose.connect(this.URL,{});
            MongooseService.databaseIntance = await mongoose.connection;

            MongooseService.databaseIntance.once('open', () => {
                console.log("Connected to mongoose database successfully");
            });

            MongooseService.databaseIntance.on('error', () => {
                console.log("Error occured while connecting o Mongoose Database : ");
            });

        } catch (error: any) {
            console.log("Error occured while connecting o Mongoose Database : ",error);
            throw error;
        }
    }

    /** Disconnect from database if not needed */
    public static end = () => {
        if(!MongooseService.databaseIntance) return;
        mongoose.disconnect();
    }

    // public static doQuery = async (params: any) => {
    //     if(!MongooseService.databaseIntance){
    //         await MongooseService.init();
    //     } 
    //     return await MongooseService.databaseIntance;
    // }
}