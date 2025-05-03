// import { connectToDatabase } from '../../lib/mongodb';
import connectToDatabase from '@/lib/mongodb';
// import User from '../../models/User';
import Users from '@/models/Users';

export default async function handler(req, res) {
  await connectToDatabase();

  const { method } = req;

  if (method === 'GET') {
    const { email } = req.query;
    const user = await Users.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
  }

  if (method === 'PUT') {
    const { email, name, designation, image } = req.body;
    const updatedUser = await Users.findOneAndUpdate(
      { email },
      { name, designation, image },
      { new: true }
    );
    return res.status(200).json({ message: 'Profile updated', user: updatedUser });
  }

  res.status(405).json({ message: 'Method not allowed' });
}
