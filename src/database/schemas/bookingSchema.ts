import mongoose from 'mongoose';

interface IBooking {
  date: string;
  time: number;
  name: string;
  phone: string;
  email: string;
  visitors: number;
  tables: number;
}

const bookingSchema = new mongoose.Schema<IBooking>({
  date: { type: String, required: true },
  time: { type: Number, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  visitors: { type: Number, required: true },
  tables: { type: Number, required: true },
});

export const BookingModel = mongoose.model('Booking', bookingSchema);
