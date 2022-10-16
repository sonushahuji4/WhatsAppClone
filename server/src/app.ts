import { Request, Response } from 'express';
import { AddUserController } from './controllers/addUserController';
import { IUser } from './models/user';
import * as Http from 'http-status-codes';

export class App {

    /**
     * Add New User To Database
     * @param req 
     * @param res 
     */
    public static addUser = async (req: Request, res: Response) => {
        try {
            const addUserController = new AddUserController();
            const userRes : IUser = await addUserController.addUser(req.body);
            res.status(Http.OK).send(userRes);
        } catch (error) {
            if((error instanceof Error)){
                console.log(error.message);
                return res.status(Http.BAD_REQUEST).json({
                    message : error.message,
                    responseCode : Http.BAD_REQUEST
                });
            } else {
                console.log(error);
                return res.status(Http.INTERNAL_SERVER_ERROR).json({
                    message : error,
                    responseCode : Http.INTERNAL_SERVER_ERROR
                });
            }
        }
    }

    /** Get all users */
    public static getUsers = async (req: Request, res: Response) => {
        try {
            const addUserController = new AddUserController();
            const allUsers : any = await addUserController.getUsers();
            res.status(Http.OK).send(allUsers);
        } catch (error) {
            if((error instanceof Error)){
                console.log(error.message);
                return res.status(Http.BAD_REQUEST).json({
                    message : error.message,
                    responseCode : Http.BAD_REQUEST
                });
            } else {
                console.log(error);
                return res.status(Http.INTERNAL_SERVER_ERROR).json({
                    message : error,
                    responseCode : Http.INTERNAL_SERVER_ERROR
                });
            }
        }
    }   
}