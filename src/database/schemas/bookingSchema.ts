import mongoose from "mongoose";

interface IBooking {
  date: string;
  time: number;
  email: string;
  visitors: number;
  tables: number;
  archived: boolean;
}

const bookingSchema = new mongoose.Schema<IBooking>({
  date: { type: String, required: true },
  time: { type: Number, required: true },
  email: { type: String, required: true },
  visitors: { type: Number, required: true },
  tables: { type: Number, required: true },
  archived: { type: Boolean, required: true },
});

export const BookingModel = mongoose.model("Booking", bookingSchema);
