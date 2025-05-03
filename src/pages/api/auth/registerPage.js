// pages/api/register.js
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
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await Users.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({ name, email, password:hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
}
