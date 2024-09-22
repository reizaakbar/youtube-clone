const { getDatabase } = require("../config/mongoConnection");
const { followUser } = require("../models/follow");

const collection = getDatabase().collection("follows");

const typeDefs = `#graphql

    type Follow {
        _id: ID!,
        followingId: ID!,
        followerId: ID!,
        createdAt: String,
        updatedAt: String
    }

    type Mutation {
        followUser(followingId: ID) : Follow
    }

`;

const resolvers = {
  Mutation: {
    followUser,
  },
};

module.exports = {
  followTypeDefs: typeDefs,
  followResolvers: resolvers,
};
