import express from "express";
import { App } from "../app";

const addUserRouter = express.Router();

addUserRouter.get("/", App.getUsers); /**  Get all existing users */
addUserRouter.post("/", App.addUser); /**  Add a New User */

export { addUserRouter }