//in here we defined the methods of a User schema
// define collection for use here

const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const {
  hashPassword,
  createError,
  createToken,
  comparePassword,
} = require("../helpers/helpers");

const collection = getDatabase().collection("users");

async function addUser(_parent, args) {
  const { name, username, email, password, imgUrl } = args.input;

  if (!name || !username || !password)
    throw createError("Name, Username and Password are required", 400);

  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  )
    throw createError("Invalid Email Format", 400);

  if (password.length < 5)
    throw createError("Password should be at least 5 letters long", 400);

  const existingUsername = await collection.findOne({ username });
  const existingEmail = await collection.findOne({ email });

  if (existingUsername || existingEmail)
    throw createError("Username/Email already exists", 400);

  const userCreated = await collection.insertOne({
    name,
    username,
    email,
    password: hashPassword(password),
    imgUrl,
  });
  const newUser = await collection.findOne(
    { _id: new ObjectId(userCreated.insertedId) },
    {
      projection: {
        password: 0,
      },
    }
  );

  return newUser;
}

async function findUser(_parent, args, context) {
  const loginData = await context.authentication();
  const user = await collection.findOne({
    name: {
      $regex: `(?i).*${args.name}.*(?-i)`,
    },
  });
  return user;
}

async function login(_parent, args) {
  //get inputs

  const { username, password } = args;

  if (!username || !password) {
    console.log("bad input");
    throw createError("Username/Password required", 400);
  }

  const user = await collection.findOne({ username });

  if (!user) {
    console.log("User not found");
    throw createError("Invalid Login", 401);
  }

  if (!comparePassword(password, user.password))
    throw createError("Invalid Login", 401);

  return {
    token: createToken({
      userId: user._id,
      username: user.username,
      name: user.name,
    }),
  };
}

async function userProfile(_parent, _args, context) {
  const { userId } = await context.authentication();

  const agg = [
    {
      $lookup: {
        from: "follows",
        localField: "_id",
        foreignField: "followingId",
        as: "followers",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "followers.followerId",
        foreignField: "_id",
        as: "followers",
      },
    },
    {
      $project: {
        "followers.password": 0,
        password: 0,
      },
    },
    {
      $lookup: {
        from: "follows",
        localField: "_id",
        foreignField: "followerId",
        as: "followings",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "followings.followingId",
        foreignField: "_id",
        as: "followings",
      },
    },
    {
      $project: {
        password: 0,
        "followings.password": 0,
      },
    },
    {
      $match: {
        _id: new ObjectId(userId),
      },
    },
  ];

  const user = await collection.aggregate(agg).toArray();

  return user[0];
}

module.exports = {
  addUser,
  findUser,
  login,
  userProfile,
};
