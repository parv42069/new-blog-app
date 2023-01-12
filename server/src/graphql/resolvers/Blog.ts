import Blog from '../../models/Blog';
import User from '../../models/User';
export default {
  Query: {
    async blog(_: any, { id }: any) {
      const blog = await Blog.findById(id);
      return blog;
    },
    async blogs() {
      const blogs = await Blog.find().populate({
        path: 'author',
        model: 'User',
      });
      return blogs;
    },
  },
  Mutation: {
    async addNewBlog(
      _: any,
      { id, addBlogInput: { title, content, genre } }: any
    ) {
      const user = await User.findById(id);
      const blog = new Blog({
        title: title,
        content: content,
        genre: genre,
        author: user,
      });
      await blog.save();
      return blog;
    },
    async deleteBlog(_: any, { id }: any) {
      const blog = await (
        await Blog.findByIdAndDelete(id)
      ).populate({
        path: 'author',
        model: 'User',
      });
      return blog;
    },
    async updateBlog(
      _: any,
      { updateBlogInput: { id, title, content, genre } }: any
    ) {
      const blog = await Blog.findByIdAndUpdate(id, {
        $set: {
          title: title,
          content: content,
          genre: genre,
        },
      }).populate({
        path: 'author',
        model: 'User',
      });
      return blog;
    },
  },
};
