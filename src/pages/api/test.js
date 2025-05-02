import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

// Simple model example (could be moved to /models)
const TestSchema = new mongoose.Schema({ name: String });
const Test = mongoose.models.Test || mongoose.model('Test', TestSchema);

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const docs = await Test.find({});
    res.status(200).json(docs);
  } else if (req.method === 'POST') {
    const { name } = req.body;
    const doc = await Test.create({ name });
    res.status(201).json(doc);
  } else {
    res.status(405).end();
  }
}
