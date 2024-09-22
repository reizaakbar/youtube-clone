const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const { createError } = require("../helpers/helpers");
const redis = require("../config/redis");

const collection = getDatabase().collection("posts");

async function addPost(_parent, args, context) {
  const loginData = await context.authentication();
  const { content, tags, imgUrl } = args.input;

  if (!content) throw createError("Post content is required", 400);

  const insertSuccess = await collection.insertOne({
    content,
    tags,
    imgUrl,
    authorId: new ObjectId(loginData.userId),
    comments: [],
    likes: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await redis.del("data:posts");

  const newPost = await collection.findOne({
    _id: new ObjectId(insertSuccess.insertedId),
  });
  return newPost;
}

async function getPosts(_parent, _args, context) {
  const loginData = await context.authentication();

  const agg = [
    {
      $lookup: {
        from: "users",
        localField: "authorId",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        "author.password": 0,
      },
    },
  ];

  //find out if its first time getting the data = no cache

  const postCache = await redis.get("data:posts");

  //redis is so bad and unrealiable i switched for now..
  if (!postCache) {
    console.log("Cache not there");
    const authoredPosts = await collection.aggregate(agg).toArray();
    //await redis.set("data:posts", JSON.stringify(authoredPosts));
    return authoredPosts;
  } else {
    console.log("cache there");
    const posts = JSON.parse(postCache);
    return posts;
  }
}

async function addLike(_parent, args, context) {
  const loginData = await context.authentication();
  console.log(loginData, "FROM ADDLIKE");
  const { postId } = args;
  const updatedSuccess = await collection.updateOne(
    { _id: new ObjectId(postId) },
    {
      $push: {
        likes: {
          username: loginData.username,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    }
  );

  const post = await collection.findOne({ _id: new ObjectId(postId) });

  return post;
}

async function addComment(_parent, args, context) {
  try {
    const loginData = await context.authentication();
    const { postId } = args;
    const { content } = args.input;

    const update = await collection.updateOne(
      { _id: new ObjectId(postId) },
      {
        $push: {
          comments: {
            content,
            username: loginData.username,
            createdAt: new Date(),
            updatedAt: new Date(),
            name: loginData.name,
          },
        },
      }
    );
    const updatedPost = await collection.findOne({ _id: new ObjectId(postId) });

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

async function getPost(_parent, args, context) {
  //authenticate
  await context.authentication();

  const { id } = args;

  const agg = [
    {
      $lookup: {
        from: "users",
        localField: "authorId",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        "author.password": 0,
      },
    },
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
  ];

  const post = await collection.aggregate(agg).toArray();

  return post[0];
}

module.exports = {
  addPost,
  getPosts,
  addLike,
  addComment,
  getPost,
};
