const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const subscriberCollection = db.collection('subscriber');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

async function incrementSubscribers() {
  const result = await subscriberCollection.updateOne(
    {},
    { $inc: { count: 1 } },
    { upsert: true }
  );
  return result.modifiedCount > 0 || result.upsertedCount > 0;
}

async function decrementSubscribers() {
  const result = await subscriberCollection.updateOne(
    { count: { $gt: 0 } },
    { $inc: { count: -1 } }
  );
  return result.modifiedCount > 0;
}

async function getSubscriberCount() {
  const result = await subscriberCollection.findOne({}, { projection: { count: 1 } });
  return result ? result.count : 0;
}

async function initializeSubscriberCount() {
  const count = await getSubscriberCount();
  if (count === 0) {
    await subscriberCollection.insertOne({ count: 0 });
  }
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  incrementSubscribers,
  decrementSubscribers,
  getSubscriberCount,
  initializeSubscriberCount
};
