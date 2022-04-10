import Joi from "joi";
import {validateRequest} from "backend-common-components";
import {unauthorizedError} from "backend-common-components";

const VerifyTestTokenSchema = Joi.object({
  testToken: Joi.string().required(),
})

export interface VerifyTestTokenRequestDTO {
  testToken: string;
}

export function verifyTestTokenSchemaValidation(body:any):VerifyTestTokenRequestDTO {
  return validateRequest(body, VerifyTestTokenSchema);
}

export function verifyTestTokenAsync(token: string) {
  if (!process.env.TEST_TOKEN)
    throw "missing process.env.TEST_TOKEN";

  if (token !== process.env.TEST_TOKEN)
    throw unauthorizedError;
}

export async function verifyTestTokenFromBodyAsync(body:any) {
  const token = verifyTestTokenSchemaValidation(body).testToken;
  verifyTestTokenAsync(token);
}