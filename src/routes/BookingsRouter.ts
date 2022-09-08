/**
 * Router for domain.com/bookings/xxx
 */
import express from "express";
import { cancelBooking } from "../controllers/BookingsControllers/cancelBooking";
import { createBooking } from "../controllers/BookingsControllers/createBooking";
import { getAllBookings } from "../controllers/BookingsControllers/getAllBookings";
import { getArchivedBookings } from "../controllers/BookingsControllers/getArchivedBookings";
import { getAvailableBookings } from "../controllers/BookingsControllers/getAvailableBookings";
import { patchBooking } from "../controllers/BookingsControllers/patchBooking";
const BookingsRouter = express.Router();

BookingsRouter.get("/getAvailableBookings", getAvailableBookings);
BookingsRouter.get("/getAllBookings", getAllBookings);
BookingsRouter.get("/getArchivedBookings", getArchivedBookings);
BookingsRouter.post("/createBooking", createBooking);
BookingsRouter.patch("/patchBooking", patchBooking);
BookingsRouter.delete("/cancelBooking", cancelBooking);

export default BookingsRouter;
