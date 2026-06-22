const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');


router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if(!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });

    }

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/Profile/me
// @desc    create or update user profile 
// @access  Private
router.post('/', 
  [ 
    auth, 
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(), 
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ] 
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(youtube) profileFields.youtube = youtube;
    if(facebook) profileFields.facebook = facebook;
    if(githubusername) profileFields.githubusername = githubusername;
    if(twitter) profileFields.twitter = twitter;
    if(instagram) profileFields.instagram = instagram;
    if(linkedin) profileFields.linkedin = linkedin;

  }
);

module.exports = router;