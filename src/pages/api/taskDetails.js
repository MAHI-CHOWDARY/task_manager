// pages/api/tasks.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const {
    title,
    description,
    dueDate,
    priority,
    status,
    assigneeEmail,
    creatorEmail,
  } = req.body;

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('task_manager');
    const tasksCollection = db.collection('tasks');

    const result = await tasksCollection.insertOne({
      title,
      description,
      dueDate: new Date(dueDate),
      priority,
      status,
      assigneeEmail, // storing as string (not linked _id)
      creatorEmail,  // storing as string (not linked _id)
      createdAt: new Date(),
    });

    client.close();
    return res.status(201).json({ message: 'Task created', taskId: result.insertedId });
  } catch (error) {
    console.error('Error saving task:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
