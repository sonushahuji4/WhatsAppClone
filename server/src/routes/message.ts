import express from "express";
import { App } from "../app";

const messageRouter = express.Router();

messageRouter.post("/get", App.getChatHistory); /**  Get all existing messages between that sender and receiver */
messageRouter.post("/add", App.addChats); /**  Add new message */

export { messageRouter }