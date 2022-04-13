import Joi from "joi";
import {validateRequest} from "backend-common-components";
import {CreateVoteRequest} from "@common/contracts";

const createVoteSchema = Joi.object({
  postId: Joi.string().required(),
})

export function createVoteSchemaValidation(body:any):CreateVoteRequest {
  return validateRequest(body, createVoteSchema);
}