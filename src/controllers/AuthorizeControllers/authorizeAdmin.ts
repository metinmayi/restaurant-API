import {Request, Response} from "express";
import { FlamingoResponse } from "../../models/FlamingoResponse";
import { validateAdmin } from "../../validation/AuthorizeValidation/validateAdmin";

export const authorizeAdmin = (req: Request, res: Response) => {
    const response = new FlamingoResponse();
    const validationResponse = validateAdmin(req.body);
    
    if (!validationResponse.valid) {
        response.error = validationResponse.message || 'An error has occured';
        return res.status(400).json(response);
    }
    
    const { secret } = req.body;
    
    if (!isAdmin(secret)) {
        response.error = 'Invalid secret';
        return res.status(401).json(response);
    }

    response.message = 'Welcome, admin';
    res.status(200).json(response);
}

/**
 * 
 * @param {string} secret The secret that was sent to the server
 * @returns {boolean} True if it's correct, false if not
 */
const isAdmin = (secret: string): boolean => {
    return secret === process.env.ADMIN_SECRET;
}