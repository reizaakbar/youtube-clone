const { addUser, findUser, login, userProfile } = require("../models/user");

const typeDefs = `#graphql
    
    type User {
        _id: ID!,
        name: String!,
        username: String!,
        email: String!,
        password: String,
        imgUrl: String,
        
    }

    type Profile {
        _id: ID!,
        name: String!,
        username: String!,
        email: String!,
        password: String,
        imgUrl: String,
        followers: [User],
        followings: [User]
    }

    input NewUserData{
        name: String!,
        username: String!,
        email: String!,
        password: String!,
        imgUrl: String
    }

    type ResponseLogin {
        token: String!
    }



    type Mutation {
        addUser(input: NewUserData): User,
        login(username: String!, password: String!) : ResponseLogin
    
    }

    type Query {
        userProfile: Profile,
        findUser(name: String) : User,
        
    }



`;

const resolvers = {
  Mutation: {
    addUser,
    login,
  },
  Query: {
    findUser,
    userProfile,
  },
};

module.exports = {
  userTypeDefs: typeDefs,
  userResolvers: resolvers,
};
