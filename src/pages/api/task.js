// pages/api/tasks.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { email } = req.body;

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("task_manager");
    const tasksCollection = db.collection("tasks");

    const tasks = await tasksCollection
      .find({
        $or: [
          { assigneeEmail: email },
          { creatorEmail: email },
        ],
      })
      .toArray();

    client.close();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
