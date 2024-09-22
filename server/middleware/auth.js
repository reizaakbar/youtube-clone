const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const { createError, decodeToken } = require("../helpers/helpers");

const collection = getDatabase().collection("users");

async function authentication(req) {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) throw createError("Invalid Token", 401);
  const token = bearerToken.split(" ")[1];

  const payload = decodeToken(token);

  const user = await collection.findOne({ _id: new ObjectId(payload.userId) });

  if (!user) throw createError("Invalid Token", 401);
  console.log(payload);
  return payload;
}

module.exports = authentication;
