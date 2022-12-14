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
      likes {
        id
        user
        username
        createdAt
      }
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
      comments {
        id
        username
        user
        body
        createdAt
      }
      likes {
        id
        user
        username
        createdAt
      }
    }
  }
`;
