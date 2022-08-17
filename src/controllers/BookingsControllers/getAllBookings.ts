import { Request, Response } from "express";
import "../../database/database"
import { BookingModel } from "../../database/schemas/bookingSchema";


/**
 * 
 * @param {Request} req Express Request
 * @param {Response} res Express Response
 * @returns All bookings in the collection Arra
 */
export const getAllBookings = async (req: Request, res: Response) => {

    try {
        const bookings = await BookingModel.find();
        res.status(200).json(bookings);
        return;
    } catch(error) {
        res.send(500).json(error);
    }
    
}