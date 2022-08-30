import Joi from "joi";
import { ValidationResponse } from "../../models/ValidationResponse";

const schema = Joi.object({
  date: Joi.date().required(),
  time: Joi.number().valid(18, 21).required(),
  visitors: Joi.number().min(1).max(90).required(),
});

/**
 * Validates the request body against the excepted schema
 * @param reqBody
 * @returns {ValidationResponse}
 */
export const validateGetAvailableBookings = (
  reqBody: any
): ValidationResponse => {
  const result = schema.validate(reqBody);

  if (result.error) {
    return { valid: false, message: result.error.message };
  }

  return { valid: true, message: result.error };
};
