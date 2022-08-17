/**
 * Router for domain.com/bookings/xxx
 */
import express from "express";
import { createBooking } from "../controllers/BookingsControllers/createBooking";
import { getAllBookings } from "../controllers/BookingsControllers/getAllBookings";
const BookingsRouter = express.Router();


BookingsRouter.get('/getAllBookings', getAllBookings);
BookingsRouter.post('/createBooking', createBooking);

export default BookingsRouter;