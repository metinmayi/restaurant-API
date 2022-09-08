import { Request, Response } from "express";
import { BookingModel } from "../../database/schemas/bookingSchema";
import { FlamingoResponse } from "../../models/FlamingoResponse";
import { validateCancelBooking } from "../../validation/BookingsValidation/validateCancelBooking";
export const cancelBooking = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const response = new FlamingoResponse();
  const isValid = validateCancelBooking(req.body);
  if (!isValid.valid) {
    response.error = isValid.message || "Could not validate the request body";
    return res.status(400).json(response);
  }

  try {
    debugger;
    const result = await BookingModel.updateOne({ _id }, { archived: true });
    response.message = result.modifiedCount
      ? "Booking has been deleted"
      : "Could not find a booking with provided ID";
    res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    response.error = error.message;
    res.status(500).json(response);
  }
};
