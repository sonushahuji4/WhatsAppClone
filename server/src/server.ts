import express, { Application } from "express";
import http from "http";
import cors from "cors";
import * as dotenv from "dotenv";
import { MongooseService } from './services/mongooseService';
import { addUserRouter } from './routes/addUser';
import { Server } from 'socket.io';
import Message from './mongooseDB/schemas/message';
import { IMessage } from "./models/message";

dotenv.config();
const app: Application = express();
 
/** Middlerwaver */
app.use(express.json({limit: "6mb"}));
app.use(express.urlencoded({extended: false }));
app.use(cors());

MongooseService.init();

app.use('/addUser',addUserRouter);
app.use('/getUsers',addUserRouter);

/** creating a server */
const server: any = http.createServer(app);
const serverPort = process.env.PORT || 80;
const io = new Server(server, {
    cors: {
        origin: process.env.CLENT_ENDPOINT,
        methods: ["GET", "POST"],
    }
});

const getUniqueIds = (params: any) => {
    const { senderId, receiverId} = params;
    return senderId > receiverId ? senderId + receiverId : receiverId + senderId;
}

io.on("connection",(socket) => {

    /** create a channel for a private user */
    socket.on("SUBSCRIBE", async (iDs: IMessage) => {

        let uniqueId = iDs.senderId; /** If senderId is equal to receiverId then allow self chat */

        /** Chat with a friend */
        if(iDs.senderId !== iDs.receiverId) {
            uniqueId = getUniqueIds({senderId : iDs.senderId, receiverId: iDs.receiverId});
        } 

        socket.join(uniqueId);
        console.log(`Channel Created for ID : ${uniqueId}`);
        const chatHistory:IMessage[] = await Message.find({uniqueId: uniqueId});
        io.sockets.in(uniqueId).emit("CHATHISTORY", chatHistory || []);
    });

    /** Receive message from client */
    socket.on("DISPATCH", (messageObj: IMessage) => {

        let uniqueId = messageObj.senderId; /** If senderId is equal to receiverId then allow self chat */
        
        /** Chat with a friend */
        if(messageObj.senderId !== messageObj.receiverId) {
            uniqueId = getUniqueIds({senderId : messageObj.senderId, receiverId: messageObj.receiverId});
        } 
        new Message({senderId: messageObj.senderId,uniqueId,msg : messageObj.msg}).save();
        /** Send message to client */
        io.sockets.in(uniqueId).emit("ACKNOWLEDMENT",messageObj);
    });

    /** Request to leave the chat */
    socket.on("UNSUBSCRIBE", (iDs: IMessage) =>{
        let uniqueId = iDs.senderId; /** Leave channel if created for self */
        
        /** Leave channel if no longer neede */
        if(iDs.senderId !== iDs.receiverId) {
            uniqueId = getUniqueIds({senderId : iDs.senderId, receiverId: iDs.receiverId});
        } 
        io.sockets.in(uniqueId).disconnectSockets(true);
        console.log(`User disconnected ${uniqueId}`);
    });
})

server.listen(serverPort,() => console.log(`Server running on port : ${serverPort}`))