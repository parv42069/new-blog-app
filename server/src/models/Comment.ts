import { model, Schema } from 'mongoose';

const CommentSchema = new Schema(
  {
    blog: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    data: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model('Comment', CommentSchema);
export default Comment;
