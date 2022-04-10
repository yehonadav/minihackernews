import {ObjectId} from "backend-common-components";

export interface CreatePostRequest {
  title: string;
  text: string;
}

export interface EditPostRequest extends Partial<CreatePostRequest> {}

export interface PostItem extends CreatePostRequest {
  ownerUserId: ObjectId,
  created: Date;
  votes: number;
}

export interface PostResponse extends Omit<PostItem, "ownerUserId"> {
  ownerUserId: string;
  id: string;
}

export type PostDeleteResponse = '';