/**
 * Router for domain.com/authorize/xxx
 */
import express, {Request, Response} from "express";
import { authorizeAdmin } from "../controllers/AuthorizeControllers/authorizeAdmin";
const AuthorizeRouter = express.Router();

AuthorizeRouter.post('/', authorizeAdmin);

export default AuthorizeRouter;