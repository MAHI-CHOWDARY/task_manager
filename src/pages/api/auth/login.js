// pages/api/login.js
// import { connectToDatabase } from '../../lib/mongodb';

import connectToDatabase from '@/lib/mongodb';

// import User from '../../models/User';
import Users from '@/models/Users';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    await connectToDatabase();
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Return success
    res.status(200).json({
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
}
