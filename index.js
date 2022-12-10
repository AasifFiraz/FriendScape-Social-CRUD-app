const { ApolloServer } = require("apollo-server");
const connectDB = require("./db/connect");
require("dotenv").config();
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const { url } = await server.listen({ port: 4000 });
    console.log(`Server is running at: ${url}`);
  } catch (error) {
    console.log(error);
  }
};

start();
