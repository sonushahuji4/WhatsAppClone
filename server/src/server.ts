import express, { Application } from "express";
import http from "http";
import cors from "cors";
import * as dotenv from "dotenv";
import { MongooseService } from './services/mongooseService';
import { addUserRouter } from './routes/addUser';
import { messageRouter } from './routes/message';
import { Server } from 'socket.io';
import Message from './mongooseDB/schemas/message';
// import User from './mongooseDB/schemas/user';

dotenv.config();
const app: Application = express();
 
/** Middlerwaver */
app.use(express.json({limit: "6mb"}));
app.use(express.urlencoded({extended: false }));
app.use(cors());

MongooseService.init();

app.use('/addUser',addUserRouter);
app.use('/getUsers',addUserRouter);
app.use('/message',messageRouter);

/** creating a server */
const server: any = http.createServer(app);

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
    socket.on("SUBSCRIBE", async (iDs: any) => {

        let uniqueId = iDs.senderId; /** If senderId is equal to receiverId then allow self chat */

        /** Chat with a friend */
        if(iDs.senderId !== iDs.receiverId) {
            uniqueId = getUniqueIds({senderId : iDs.senderId, receiverId: iDs.receiverId});
        } 

        socket.join(uniqueId);
        console.log(`Channel Created for ID : ${uniqueId}`);
        const chatHistory = await Message.find({uniqueId: uniqueId});
        io.sockets.in(uniqueId).emit("CHATHISTORY", chatHistory || []);
    });

    /** Receive message from client */
    socket.on("DISPATCH", async (messageObj: any) => {

        let uniqueId = messageObj.senderId; /** If senderId is equal to receiverId then allow self chat */
        
        /** Chat with a friend */
        if(messageObj.senderId !== messageObj.receiverId) {
            uniqueId = getUniqueIds({senderId : messageObj.senderId, receiverId: messageObj.receiverId});
        } 

        messageObj.uniqueId = uniqueId;
        await (new Message(messageObj)).save();
        /** Send message to client */
        io.sockets.in(uniqueId).emit("ACKNOWLEDMENT",messageObj);
    });

    /** Request to leave the chat */
    socket.on("UNSUBSCRIBE", (iDs: any) =>{
        let uniqueId = iDs.senderId;
        /** Chat with a friend */
        if(iDs.senderId !== iDs.receiverId) {
            uniqueId = getUniqueIds({senderId : iDs.senderId, receiverId: iDs.receiverId});
        } 
        io.sockets.in(uniqueId).disconnectSockets(true);
        console.log(`User disconnected ${uniqueId}`);
    });
})

server.listen(process.env.SERVER_PORT,() => console.log(`Server running on port : ${process.env.SERVER_PORT}`))