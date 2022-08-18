import {Request, Response} from "express";
import { validateAdmin } from "../../validation/AuthorizeValidation/validateAdmin";

export const authorizeAdmin = (req: Request, res: Response) => {
    const validationResponse = validateAdmin(req.body);
    
    if (!validationResponse.valid) {
        return res.status(400).json(validationResponse);
    }
    
    const { secret } = req.body;
    
    if (!isAdmin(secret)) {
        return res.sendStatus(401);
    }

    res.sendStatus(200);
}

/**
 * 
 * @param {string} secret The secret that was sent to the server
 * @returns {boolean} True if it's correct, false if not
 */
const isAdmin = (secret: string): boolean => {
    return secret === process.env.ADMIN_SECRET;
}