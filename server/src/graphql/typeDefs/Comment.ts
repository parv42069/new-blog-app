import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    comments(blogId: ID): [Comment]
  }

  type Mutation {
    addComment(blogId: ID, userId: ID, addComentInput: AddCommentInput): Comment
    deleteComment(id: ID): Comment
  }

  type Comment {
    id: ID
    blog: Blog
    user: User
    data: String
  }

  input AddCommentInput {
    data: String
  }
`;
