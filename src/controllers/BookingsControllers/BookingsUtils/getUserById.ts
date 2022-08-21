import { CustomerModel } from '../../../database/schemas/customerSchema';

/**
 * Retrieves a customers ID. If no customer exists, create a new one with the provided parameters
 * and return the newly created ID.
 * @param email Customers email adress
 * @param name Customers name
 * @param phone Customers phonenumber
 * @returns MongoDB objectID
 */
export const getCustomerId = async (
  email: string,
  name: string,
  phone: string
) => {
  debugger;
  let existingCustomer = await CustomerModel.find({ email });
  if (existingCustomer[0]) {
    return existingCustomer[0].id;
  }
  const newCustomer = new CustomerModel({ email, name, phone });
  const insertedCustomer = await newCustomer.save();
  return insertedCustomer.id;
};
