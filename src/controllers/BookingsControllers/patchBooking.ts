import { Request, Response } from "express";
import { BookingModel } from "../../database/schemas/bookingSchema";
import { CustomerModel } from "../../database/schemas/customerSchema";
import { FlamingoResponse } from "../../models/FlamingoResponse";
import { validatePatchBooking } from "../../validation/BookingsValidation/validatePatchBooking";
import { convertVisitorsToTables } from "./BookingsUtils/convertVisitorsToTables";
import { isRebookable } from "./BookingsUtils/isRebookable";

export const patchBooking = async (req: Request, res: Response) => {
  const response = new FlamingoResponse();

  const validationResponse = validatePatchBooking(req.body);

  if (!validationResponse.valid) {
    response.error = validationResponse.message || "An error has occured";
    res.status(400).json(response);
    return;
  }

  const { date, time, visitors, _id, email, originalEmail } = req.body;
  const actualTime = +time;
  if (actualTime !== 21 && actualTime !== 18) {
    return;
  }

  const canBook = await isRebookable(date, _id, actualTime, visitors);
  if (!canBook) {
    response.error = "Not enough tables";
    res.status(400).json(response);
    return;
  }

  const tables = convertVisitorsToTables(visitors);

  try {
    await BookingModel.updateOne(
      { _id },
      { date, time, visitors, email, tables }
    );

    await BookingModel.updateMany({ email: originalEmail }, { email });

    if (originalEmail !== email) {
      await CustomerModel.updateOne({ email: originalEmail }, { email });
    }

    response.message = "Successfully updated the booking";
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.error = "There was an issue connecting to the database";
    res.status(500).json(response);
  }
};
