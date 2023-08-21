if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const typeDefs = require("./schemas/index");
const userResolver = require("./resolvers/userResolver");
const productResolver = require("./resolvers/productResolver");
const categoryResolver = require("./resolvers/categoryResolver");

const resolvers = [userResolver, productResolver, categoryResolver];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
