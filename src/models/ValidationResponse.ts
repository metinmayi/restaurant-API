import Joi from "joi"

export type ValidationResponse = {
    valid: boolean,
    message: string | undefined
}