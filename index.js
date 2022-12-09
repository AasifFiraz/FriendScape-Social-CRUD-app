const { ApolloServer, gql } = require("apollo-server");
const connectDB = require("./db/connect")
require("dotenv").config()

const typeDefs = gql`
    type Query {
        Welcome: String   
    }
`

const resolvers = {
    Query: {
        Welcome: () => 'Welcome :))'
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        const {url} = await server.listen({port: 4000})
        console.log(`Server is running at: ${url}`)
    } catch (error) {
        console.log(error)
    }
}

start()