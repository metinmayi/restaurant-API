/**
 * Router for domain.com/bookings/xxx
 */
import express from "express";
import { createBooking } from "../controllers/BookingsControllers/createBooking";
import { getAllBookings } from "../controllers/BookingsControllers/getAllBookings";
import { getAvailableBookings } from "../controllers/BookingsControllers/getAvailableBookings";
import { patchBooking } from "../controllers/BookingsControllers/patchBooking";
const BookingsRouter = express.Router();

BookingsRouter.get("/getAvailableBookings", getAvailableBookings);
BookingsRouter.get("/getAllBookings", getAllBookings);
BookingsRouter.post("/createBooking", createBooking);
BookingsRouter.patch("/patchBooking", patchBooking);

export default BookingsRouter;
