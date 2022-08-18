import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { BookingModel } from '../../database/schemas/bookingSchema';
import { FlamingoResponse } from '../../models/FlamingoResponse';
import { validateCreateBooking } from '../../validation/BookingsValidation/validateCreateBooking';
import { convertVisitorsToTables } from './BookingsUtils/convertVisitorsToTables';
import { getAvailableTables } from './BookingsUtils/getAvailableTables';

/**
 * Creates a new booking in the database
 * @param {Request} req Express Request
 * @param {Response} res Express Response
 * @returns {Promise<void>}
 */
export const createBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  const response = new FlamingoResponse();

  const validationResponse = validateCreateBooking(req.body);

  if (!validationResponse.valid) {
    response.error = validationResponse.message || 'An error has occured';
    res.status(400).json(response);
    return;
  }

  const Booking = constructBooking(req.body);
  const { date, time, visitors } = Booking.toJSON();

  try {
    const availableTables = await getAvailableTables(date, time);

    const requiredTables = convertVisitorsToTables(visitors);

    if (availableTables < requiredTables) {
      response.error = 'There are not enough available tables';
      res.status(200).json(response);
      return;
    }

    await Booking.save();
    response.message = 'Successfully created a booking';

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.error = 'There was an issue connecting to the database';
    res.status(500).json(response);
  }
};

/**
 * Takes the request body and constructs a new Booking object from it.
 * @param reqBody RequestBody from Express
 * @returns {Document} Booking Document
 */
const constructBooking = (reqBody: any): Document => {
  const { date, time, name, phone, email, visitors } = reqBody;

  const tables = convertVisitorsToTables(visitors);

  const Booking = new BookingModel({
    date,
    time,
    name,
    phone,
    email,
    visitors,
    tables,
  });

  return Booking;
};
