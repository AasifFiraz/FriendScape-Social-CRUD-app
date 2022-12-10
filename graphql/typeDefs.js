const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: Date
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
    verifyToken(token: String!): User!
  }
`;

module.exports = typeDefs