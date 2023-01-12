import { gql } from '@apollo/client';

const ADD_USER = gql`
  mutation AddNewUser($addUserInput: AddUserInput) {
    addNewUser(addUserInput: $addUserInput) {
      email
      id
      username
    }
  }
`;

export { ADD_USER };
