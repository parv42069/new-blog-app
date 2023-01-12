import { gql } from '@apollo/client';

const ADD_BLOG = gql`
  mutation AddNewBlog($addBlogInput: AddBlogInput, $addNewBlogId: ID) {
    addNewBlog(addBlogInput: $addBlogInput, id: $addNewBlogId) {
      id
      title
      content
      genre
      author {
        email
        id
        username
      }
    }
  }
`;

const DELETE_BLOG = gql`
  mutation DeleteBlog($deleteBlogId: ID) {
    deleteBlog(id: $deleteBlogId) {
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

const UPDATE_BLOG = gql`
  mutation Mutation($updateBlogInput: UpdateBlogInput) {
    updateBlog(updateBlogInput: $updateBlogInput) {
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

export { ADD_BLOG, DELETE_BLOG, UPDATE_BLOG };
