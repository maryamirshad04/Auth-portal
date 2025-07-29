const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'myUserDatabase';
const collectionName = 'users';

let users;

async function connectDB() {
  const client = new MongoClient(url);
  await client.connect();
  console.log('Connected to MongoDB');
  const db = client.db(dbName);
  users = db.collection(collectionName);
}

function getUserCollection() {
  return users;
}

module.exports = { connectDB, getUserCollection };

