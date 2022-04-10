import {Schema, Document} from 'mongoose';
import {VoteItem} from "@common/contracts";

export type VotesDocument = Document & VoteItem;

export const votesSchema = new Schema<VotesDocument>({
  userId: { type: Schema.Types.ObjectId, required: true, index: true },
  postId: { type: Schema.Types.ObjectId, required: true, index: true },
  created: { type: Date, default: Date.now },
});

votesSchema.index({ userId: 1, postId: 1}, { unique: true });

votesSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  }
});
