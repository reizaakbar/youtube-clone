if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { userTypeDefs, userResolvers } = require("./schemas/User");
const { connectMongo } = require("./config/mongoConnection");
const { postTypeDefs, postResolvers } = require("./schemas/Post");
const authentication = require("./middleware/auth");
const { followTypeDefs, followResolvers } = require("./schemas/Follow");
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
  introspection: true,
});

(async () => {
  await connectMongo();
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: PORT,
    },
    context: async ({ req, res }) => {
      //the context itself returns an object
      return {
        //the object contain a method
        async authentication() {
          const authData = await authentication(req);
          return authData;
        },
      };
    },
  });
  console.log(`🚀  Server ready at: ${url}`);
})();
