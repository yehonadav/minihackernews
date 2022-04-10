import Joi from "joi";
import {validateRequest} from "backend-common-components";
import {CreatePostRequest} from "@common/contracts";

const createPostSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
})

export function createPostSchemaValidation(body:any):CreatePostRequest {
  return validateRequest(body, createPostSchema);
}