import {Request, Response} from "express";
import { validateAdmin } from "../../validation/AuthorizeValidation/validateAdmin";

export const authorizeAdmin = (req: Request, res: Response) => {
    const validationResponse = validateAdmin(req.body);
    
    if (!validationResponse.valid) {
        return res.status(400).json(validationResponse);
    }
    
    const { secret } = req.body;
    
    if (secret === process.env.ADMIN_SECRET) {
        return res.sendStatus(200);
    }

    res.sendStatus(401);
}