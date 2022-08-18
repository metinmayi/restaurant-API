import Joi from "joi";
import { ValidationResponse } from "../../models/ValidationResponse";

const schema = Joi.object({
    secret: Joi.string().required()
});

/**
 * Validates the request body against the excepted schema
 * @param reqBody 
 * @returns ValidationResponse
 */
export const validateAdmin = (reqBody: any): ValidationResponse => {

    const result = schema.validate(reqBody);
    
    if (result.error) {
        return {valid: false, message: result.error.message || 'Error'};
    }

    return {valid: true, message: result.error};
}