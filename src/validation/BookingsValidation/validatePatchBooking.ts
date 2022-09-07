import Joi from "joi";
import { ValidationResponse } from "../../models/ValidationResponse";

const schema = Joi.object({
  _id: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.number().valid(18, 21).required(),
  email: Joi.string().email().required(),
  visitors: Joi.number().required(),
});

/**
 * Validates the request body against the excepted schema
 * @param reqBody
 * @returns {ValidationResponse}
 */
export const validatePatchBooking = (reqBody: any): ValidationResponse => {
  const result = schema.validate(reqBody);

  if (result.error) {
    return { valid: false, message: result.error.message };
  }

  return { valid: true, message: result.error };
};
