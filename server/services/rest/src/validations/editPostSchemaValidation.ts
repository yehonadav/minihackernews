import Joi from "joi";
import {apiError, validateRequest} from "backend-common-components";
import {EditPostRequest} from "@common/contracts";

const editPostSchema = Joi.object({
  title: Joi.string(),
  text: Joi.string(),
})

export function editPostSchemaValidation(body:any):EditPostRequest {
  const data = validateRequest(body, editPostSchema);
  if (Object.keys(data).length === 0)
    throw apiError({statusCode: 400, message: "nothing to edit"});
  return data;
}