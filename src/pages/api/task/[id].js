// import { MongoClient, ObjectId } from "mongodb";

// export default async function handler(req, res) {
//   if (req.method !== "PUT") return res.status(405).json({ message: "Method not allowed" });

//   const { id } = req.query;
//   // const updateData = req.body;

//   try {
//     const client = await MongoClient.connect(process.env.MONGODB_URI);
//     const db = client.db("task_manager");
//     const tasks = db.collection("tasks");
//     const { status, priority } = req.body;

//     const result = await tasks.updateOne(
//       { _id: new ObjectId(String(id)) },
//       { $set: { status, priority } }
//     );

//     client.close();

//     if (result.modifiedCount === 1) {
//       res.status(200).json({ message: "Task updated successfully" });
//     } else {
//       res.status(404).json({ message: "No task updated" });
//     }
//   } catch (error) {
//     console.error("Error updating task:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// }




import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) return res.status(400).json({ message: "Task ID is required" });

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("task_manager");
    const tasks = db.collection("tasks");

    if (req.method === "PUT") {
      const { status, priority } = req.body;

      const result = await tasks.updateOne(
        { _id: new ObjectId(String(id)) },
        { $set: { status, priority } }
      );

      client.close();

      if (result.modifiedCount === 1) {
        return res.status(200).json({ message: "Task updated successfully" });
      } else {
        return res.status(404).json({ message: "No task found to update" });
      }
    }

    if (req.method === "DELETE") {
      const result = await tasks.deleteOne({ _id: new ObjectId(id) });

      client.close();

      if (result.deletedCount === 1) {
        return res.status(200).json({ message: "Task deleted successfully" });
      } else {
        return res.status(404).json({ message: "No task found to delete" });
      }
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
