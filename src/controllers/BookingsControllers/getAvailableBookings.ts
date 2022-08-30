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
  const validationResponse = validateGetAvailableBookings(req.query);

  if (!validationResponse.valid || !isResponse(req.query)) {
    response.error = validationResponse.message || "Invalid payload";
    res.status(400).json(response);
    return;
  }

  try {
    const availableTables = await getAvailableTables(
      req.query.date,
      req.query.time
    );
    const requiredTables = convertVisitorsToTables(+req.query.visitors);
    const isEnough = requiredTables <= availableTables;

    response.message = "Booking status:";
    response.data.push(isEnough);
    res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    response.error = error;
    res.status(500).json(response);
  }
};

/**
 * Type predicate for the getAvailableBookings
 * @param reqParams The request query
 * @returns reqParams is ValidResponse
 */
const isResponse = (reqParams: any): reqParams is validResponse => {
  return (
    typeof reqParams.date === "string" &&
    typeof +reqParams.visitors === "number" &&
    (+reqParams.time === 18 || +reqParams.time === 21)
  );
};

interface validResponse {
  date: "string";
  time: 18 | 21;
  visitors: number;
}
