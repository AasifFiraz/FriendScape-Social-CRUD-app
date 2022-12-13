const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: Date
    user: ID!
    comments: [Comment]!
    likes: [Like]!
    likesCount: Int!
    commentsCount: Int!
  }

  type Comment {
    id: ID!
    username: String!
    body: String!
    user: ID!
    createdAt: Date!
  }

  type Like {
    id: ID!
    createdAt: Date
    username: String!
    user: ID!
  }

  type Query {
    getPosts: [Post]
    getPost(PostId: ID!): Post
  }

  type User {
    id: ID!
    email: String!
    username: String!
    token: String!
    createdAt: Date
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Mutation {
    register(registerInput: RegisterInput!): User!
    login(loginInput: LoginInput!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: String!, commentID: ID!): Post!
    likePost(PostId: ID!): Post!
  }
`;

module.exports = typeDefs;
