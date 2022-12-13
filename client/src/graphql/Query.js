import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      username
      body
      createdAt
      likesCount
      commentsCount
      user
      comments {
        id
        user
        username
        body
        createdAt
      }
    }
  }
`;

export const GET_POST = gql`
  query getPost($postId: ID!) {
    getPost(PostId: $postId) {
      id
      username
      body
      likesCount
      commentsCount
      createdAt
    }
  }
`;
