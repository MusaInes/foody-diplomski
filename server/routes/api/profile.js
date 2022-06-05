const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
//const Post = require('../../models/Post');

//@route    GET api/profile/me
//@desc     Get current users profile
//@access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar', 'email']);
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/', auth, async (req, res) => {
  const {
    website,
    bio,
    youtube,
    twitter,
    facebook,
    instagram,
    linkedin,
    gender,
    weight,
    height,
    age,
    activity
  } = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (website) profileFields.website = website;
  if (bio) profileFields.bio = bio;
  if (gender) profileFields.gender = gender;
  if (weight) profileFields.weight = weight;
  if (height) profileFields.height = height;
  if (age) profileFields.age = age;
  if (activity) profileFields.activity = activity;

  // Build social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //update profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      return res.json(profile);
    }
    //create profile
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500).send('Server Error');
  }
});

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user.isAdmin) {
    res.status(401).json({ msg: 'Unauthorised access' });
  }

  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar', 'email']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user.isAdmin) {
    res.status(401).json({ msg: 'Unauthorised access' });
  }

  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user and posts
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    DELETE api/profile/:id
// @desc     Delete profile and user for admin
// @access   Private / Restricted
router.delete('/:id', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user.isAdmin) {
    res.status(401).json({ msg: 'Unauthorised access' });
  }

  try {
    //Remove profile
    await Profile.findOneAndRemove({ user: req.params.id });

    //Remove user
    await User.findOneAndRemove({ _id: req.params.id });
    res.status(200).json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
