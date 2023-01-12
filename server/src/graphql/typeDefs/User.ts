import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    addNewUser(addUserInput: AddUserInput): User
  }

  type User {
    id: ID
    username: String
    email: String
  }

  input AddUserInput {
    username: String
    email: String
  }
`;
