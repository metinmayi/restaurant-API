import { Request, Response } from "express";
import { BookingModel } from "../../database/schemas/bookingSchema";
import { FlamingoResponse } from "../../models/FlamingoResponse";
import { validatePatchBooking } from "../../validation/BookingsValidation/validatePatchBooking";

export const patchBooking = async (req: Request, res: Response) => {
  const response = new FlamingoResponse();

  const validationResponse = validatePatchBooking(req.body);

  if (!validationResponse.valid) {
    response.error = validationResponse.message || "An error has occured";
    res.status(400).json(response);
    return;
  }

  const { date, time, tables, _id } = req.body;

  try {
    await BookingModel.updateOne({ _id }, { date, time, tables });
    response.message = "Successfully updated the booking";
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.error = "There was an issue connecting to the database";
    res.status(500).json(response);
  }
};
