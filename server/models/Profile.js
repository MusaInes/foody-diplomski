const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    gender: {
      type: String,
      required: [true, 'Please Select gender']
    },
    weight: {
      type: Number,
      required: [true, 'Please Enter weight']
    },
    height: {
      type: Number,
      required: [true, 'Please Enter height']
    },
    age: {
      type: Number,
      required: [true, 'Please Enter age']
    },
    activity: {
      type: Number,
      required: [true, 'Please Enter activity']
    },
    company: {
      type: String
    },
    website: {
      type: String
    },
    bio: {
      type: String
    },
    location: {
      type: String
    },
    social: {
      youtube: {
        type: String
      },
      twitter: {
        type: String
      },
      facebook: {
        type: String
      },
      linkedin: {
        type: String
      },
      instagram: {
        type: String
      }
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = Profile = mongoose.model('profile', ProfileSchema);
