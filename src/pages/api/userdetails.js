// pages/api/users.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // e.g., "mongodb+srv://user:pass@cluster.mongodb.net"

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await MongoClient.connect(uri);

    const db = client.db('task_manager'); // Replace with your DB name
    const usersCollection = db.collection('users');

    const users = await usersCollection
      .find({}, { projection: { email: 1 } }) // only get email field
      .toArray();

      // const users = await usersCollection.findOne({ email: "john@example.com" });

    // Optional: map to clean result
    const result = users.map((user) => ({
      _id: user._id.toString(),
      email: user.email,
    }));

    client.close();
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
