import express, { Application } from "express";
import http, { Server } from "http";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();
const app: Application = express();
 
/** Middlerwaver */
app.use(express.json({limit: "6mb"}));
app.use(express.urlencoded({extended: false }));
app.use(cors());

/** creating a server */
const server: Server = http.createServer(app);
server.listen(process.env.SERVER_PORT,() => console.log(`Server running on port : ${process.env.SERVER_PORT}`))