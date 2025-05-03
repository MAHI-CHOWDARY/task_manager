// pages/api/test-db.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export default async function handler(req, res) {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    res.status(200).json({ message: 'MongoDB connected successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'MongoDB connection failed!', error: error.message });
  }
}
