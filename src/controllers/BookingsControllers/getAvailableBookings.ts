import { Request, Response } from "express";

import { FlamingoResponse } from "../../models/FlamingoResponse";
import { validateGetAvailableBookings } from "../../validation/BookingsValidation/validateGetAvailableBookings";
import { convertVisitorsToTables } from "./BookingsUtils/convertVisitorsToTables";
import { getAvailableTables } from "./BookingsUtils/getAvailableTables";

/**
 * Gets all bookings. Only returns an object with relevant fields.
 * @param {Request} req Express Request
 * @param {Response} res Express Response
 * @returns All bookings in the collection
 */
export const getAvailableBookings = async (req: Request, res: Response) => {
  const response = new FlamingoResponse();
  console.log(req.query);
  const validationResponse = validateGetAvailableBookings(req.query);

  if (!validationResponse.valid) {
    response.error = validationResponse.message || "An error has occured";
    res.status(400).json(response);
    return;
  }
  if (typeof req.query.date !== "string") {
    return;
  }
  console.log("Date ok");

  const time = req.query.time || "0";

  const converted = +time;

  if (converted !== 18 && converted !== 21) {
    return;
  }
  console.log("Time ok");

  const availableTables = await getAvailableTables(req.query.date, converted);

  if (!req.query.visitors) {
    return;
  }
  if (+req.query.visitors < 1 || +req.query.visitors > 90) {
    return;
  }
  console.log("visitors ok");

  const requiredTables = convertVisitorsToTables(+req.query.visitors);
  console.log(requiredTables);
  console.log(availableTables);

  const isEnough = requiredTables <= availableTables;

  response.data.push(isEnough);

  res.status(200).json(response);
};
