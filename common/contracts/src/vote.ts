import {ObjectId} from "backend-common-components";

export interface CreateVoteRequest {
  userId: string;
  postId: string;
}

export interface VoteItem extends Omit<CreateVoteRequest, 'userId'|'postId'> {
  userId: ObjectId;
  postId: ObjectId;
  created: Date;
}

export interface VoteResponse extends Omit<VoteItem, 'userId'|'postId'> {
  userId: string;
  postId: string;
  id: string;
}

export type VoteDeleteResponse = '';