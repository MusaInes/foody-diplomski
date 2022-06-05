const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

//@route    GET api/users
//@desc     Test route
//@access   public
router.get('/', (req, res) => res.send('User route'));

router.post('/update', auth, async (req, res) => {
  try {
    const {email, name} = req.body;

    let userFields = {};
    if (email) userFields.email = email;
    if (name) userFields.name = name;

    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: userFields },
      { new: true}
    ).select('-password');
    return res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
})

//@route    POST api/users
//@desc     User registration
//@access   public
router.post(
  '/',
  [
    check('email', 'Please enter valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 5 or more characters'
    ).isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email });
      //TODO add response standardisation to all responeses
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      //get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      //new instance of user
      user = new User({
        name,
        email,
        avatar,
        password
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      let secret;
      if (!process.env.HEROKU) {
        const config = require('config');
        secret = config.get('jwtSecret');
      } else {
        secret = process.env.jwtSecret;
      }

      //TODO set token for 1h = 3600
      jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

module.exports = router;
