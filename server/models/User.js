const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Please Enter your email']
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Please Enter your password']
    },
    avatar: {
      type: String
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = User = mongoose.model('user', UserSchema);
