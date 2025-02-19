import { IUser } from './../model/user.model';
import { Request } from "express";


declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}