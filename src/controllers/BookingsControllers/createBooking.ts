import { Request, Response } from "express";
import { BookingModel } from "../../database/schemas/bookingSchema";
import { validateCreateBooking } from "../../validation/AuthorizeValidation/validateCreateBooking";

export const createBooking = async (req: Request, res: Response) => {
    const validationResponse = validateCreateBooking(req.body);

    if (!validationResponse.valid) {
        res.status(400).json(validationResponse)
        return;
    }

    const {date, time, name, phone, email, visitors} = req.body;

    const Booking = new BookingModel({
        date,
        time,
        name,
        phone,
        email,
        visitors
    });

    try {
        await Booking.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
