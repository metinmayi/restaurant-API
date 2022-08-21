import mongoose from 'mongoose';

interface IBooking {
  name: string;
  phone: string;
  email: string;
}

const customerSchema = new mongoose.Schema<IBooking>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

export const CustomerModel = mongoose.model('customers', customerSchema);
