import {Schema, Document} from 'mongoose';
import {PostItem} from "@common/contracts";

export type PostsDocument = Document & PostItem;

export const postsSchema = new Schema({
  title: { type: String, required: true },
  text: String,
  votes: { type: Number, default: 0, index: true },
  created: { type: Date, default: Date.now },
  ownerUserId: { type: Schema.Types.ObjectId, required: true, index: true }
});

postsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  }
});
