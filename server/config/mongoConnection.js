const { MongoClient } = require("mongodb");

const url = process.env.DB_URL;
const client = new MongoClient(url);

const dbName = "Youtubers";

async function connectMongo() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    return "done";
  } catch (error) {
    console.log(error);
  }
}

function getDatabase() {
  return client.db(dbName);
}

module.exports = {
  connectMongo,
  getDatabase,
};
