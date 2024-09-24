import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    sparse: true, // Makes it unique only if it exists
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema)

export default User;
