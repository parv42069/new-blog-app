import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    blog(id: ID!): Blog
    blogs: [Blog]
  }

  type Mutation {
    addNewBlog(id: ID, addBlogInput: AddBlogInput): Blog
    deleteBlog(id: ID): Blog
    updateBlog(updateBlogInput: UpdateBlogInput): Blog
  }

  type Blog {
    id: ID
    title: String
    content: String
    genre: String
    author: User
  }

  input AddBlogInput {
    title: String
    content: String
    genre: String
  }

  input UpdateBlogInput {
    id: ID
    title: String
    content: String
    genre: String
  }
`;
