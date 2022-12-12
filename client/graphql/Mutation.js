import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation registerUser($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      id
      username
      email
      token
      createdAt
    }
  }
`;

export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      createdAt
      body
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      username
      body
      createdAt
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: String!, $commentId: ID!) {
    deleteComment(postId: $postId, commentID: $commentId) {
      id
      username
      body
      comments {
        id
        user
        username
      }
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(PostId: $postId) {
      id
      body
      createdAt
      username
      likes {
        id
        user
        createdAt
        createdAt
      }
    }
  }
`;
