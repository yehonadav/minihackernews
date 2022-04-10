import {Schema, Document} from 'mongoose';
import {UserItem} from "@common/contracts";

export type UsersDocument = Document & UserItem;

export const usersSchema = new Schema<UsersDocument>({
  username: { type: String, required: true, index: true },
  created: { type: Date, default: Date.now },
});

usersSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  }
});
