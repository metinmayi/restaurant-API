import { CustomerModel } from "../../../database/schemas/customerSchema";

/**
 * Retrieves a customers Email. If no customer exists, create a new one with the provided parameters
 * and return the newly created Email.
 * @param email Customers email adress
 * @param name Customers name
 * @param phone Customers phonenumber
 * @returns Customers Email
 */
export const getCustomerEmail = async (
  email: string,
  name: string,
  phone: string
) => {
  let existingCustomer = await CustomerModel.find({ email });
  if (existingCustomer[0]) {
    return existingCustomer[0].email;
  }
  const newCustomer = new CustomerModel({ email, name, phone });
  const insertedCustomer = await newCustomer.save();
  return insertedCustomer.email;
};
