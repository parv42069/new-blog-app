import Blog from '../../models/Blog';
import User from '../../models/User';
import Comment from '../../models/Comment';
export default {
  Query: {
    async comments(_: any, { blogId }: any) {
      console.log(blogId);
      const abc = await Comment.find({ blog: blogId });
      console.log(abc);
      const comments = await Comment.find({ blog: blogId })
        .populate({
          path: 'user',
          model: 'User',
        })
        .populate({
          path: 'blog',
          model: 'Blog',
        });
      return comments;
    },
  },
  Mutation: {
    async addComment(
      _: any,
      { blogId, userId, addComentInput: { data } }: any
    ) {
      console.log(blogId);
      console.log(userId);
      const user = await User.findById(userId);
      const blog = await Blog.findById(blogId);
      console.log(blog);
      const newComment = new Comment({
        blog: blog,
        user: user,
        data: data,
      });
      await newComment.save();
      return newComment;
    },
    async deleteComment(_: any, { id }: any) {
      const comment = await Comment.findByIdAndDelete(id)
        .populate({
          path: 'user',
          model: 'User',
        })
        .populate({
          path: 'blog',
          model: 'Blog',
        });
      return comment;
    },
  },
};
