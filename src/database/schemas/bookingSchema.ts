import mongoose from 'mongoose';

interface IBooking {
  date: string;
  time: number;
  userId: string;
  visitors: number;
  tables: number;
}

const bookingSchema = new mongoose.Schema<IBooking>({
  date: { type: String, required: true },
  time: { type: Number, required: true },
  userId: { type: String, required: true },
  visitors: { type: Number, required: true },
  tables: { type: Number, required: true },
});

export const BookingModel = mongoose.model('Booking', bookingSchema);
