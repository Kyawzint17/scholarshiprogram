// lib/userRole.js

const { MongoClient } = require('mongodb');

async function getUserRole(email) {
  const uri = 'mongodb+srv://u6215106:PiZMT9GgPN8fXn70@cluster0.xnt54zm.mongodb.net/'; // MongoDB connection URI
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db('scholarship');
    const usersCollection = db.collection('user');

    const user = await usersCollection.findOne({ email });

    if (user) {
      return user.role; // Return the user's role
    } else {
      return null; // User not found in the database
    }
  } finally {
    client.close();
  }
}

module.exports = getUserRole;
