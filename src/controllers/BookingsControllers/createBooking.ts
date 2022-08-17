import { Request, Response } from "express";
import { Document } from "mongoose";
import { BookingModel } from "../../database/schemas/bookingSchema";
import { validateCreateBooking } from "../../validation/BookingsValidation/validateCreateBooking";

/**
 * Creates a new booking in the database
 * @param {Request} req Express Request
 * @param {Response} res Express Response
 * @returns {Promise<void>}
 */
export const createBooking = async (req: Request, res: Response): Promise<void> => {
    const validationResponse = validateCreateBooking(req.body);

    if (!validationResponse.valid) {
        res.status(400).json(validationResponse)
        return;
    }

    const Booking = constructBooking(req.body);

    try {
        await Booking.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

/**
 * Takes the request body and constructs a new Booking object from it.
 * @param reqBody RequestBody from Express
 * @returns {Document} Booking Document
 */
const constructBooking = (reqBody: any): Document => {
    const {date, time, name, phone, email, visitors} = reqBody;

    const Booking = new BookingModel({
        date,
        time,
        name,
        phone,
        email,
        visitors
    });

    return Booking;
}