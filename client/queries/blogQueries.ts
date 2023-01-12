import { gql } from '@apollo/client';

const GET_BLOGS = gql`
  query Blogs {
    blogs {
      id
      title
      content
      genre
      author {
        email
        username
        id
      }
    }
  }
`;

const GET_BLOG = gql`
  query Blogs($blogId: ID!) {
    blog(id: $blogId) {
      id
      title
      content
      genre
      author {
        id
        username
        email
      }
    }
  }
`;

export { GET_BLOGS, GET_BLOG };
