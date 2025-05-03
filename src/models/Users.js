import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    default: ''
  },
  image: {
    type: String, // Can store base64 or URL
    default: ''
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
