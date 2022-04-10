import Joi from "joi";
import {validateRequest} from "backend-common-components";

const loginWithUsernameSchema = Joi.object({
  username: Joi.string().lowercase().trim().required(),
  password: Joi.string().required(),
})

export interface LoginRequestDTO {
  username: string;
  password: string;
}

export function loginWithUsernameSchemaValidation(body:any):LoginRequestDTO {
  return validateRequest(body, loginWithUsernameSchema);
}