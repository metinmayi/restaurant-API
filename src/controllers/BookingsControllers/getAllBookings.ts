import { Request, Response } from "express";
import "../../database/database"
import { BookingModel } from "../../database/schemas/bookingSchema";
import { FlamingoResponse } from "../../models/FlamingoResponse";


/**
 * 
 * @param {Request} req Express Request
 * @param {Response} res Express Response
 * @returns All bookings in the collection Arra
 */
export const getAllBookings = async (req: Request, res: Response) => {
    const response = new FlamingoResponse();

    try {
        const bookings = await BookingModel.find();
        response.message = 'Successfully retrieved all bookings';
        response.data = bookings;
        res.status(200).json(response);
        return;
    } catch(error) {
        console.log(error)
        response.error = "There was an issue connecting to the database";

        res.status(500).json(response);
    }
    
}