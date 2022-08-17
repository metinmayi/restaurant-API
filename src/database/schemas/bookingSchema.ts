import mongoose from "mongoose";

interface IBooking {
    date: String,
    time: Number,
    name: String,
    phone: String,
    email: String,
    visitors: Number
};

const bookingSchema = new mongoose.Schema<IBooking>({
    date: {type: String, required: true},
    time: {type: Number, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    visitors: {type: Number, required: true}
});

export const BookingModel = mongoose.model('Booking', bookingSchema);