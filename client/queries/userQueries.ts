import { gql } from '@apollo/client';

const GET_USERS = gql`
  query getUsers {
    users {
      email
      username
      id
    }
  }
`;

export { GET_USERS };
