const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const passport = require("passport");
const { extractFriends, formatOutPut } = require("./utils");

module.exports.register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    picture_path, // from req by multer
    friends, // 0 at first
    location,
    occupation,
  } = req.body;
  const { filename } = req.file;

  try {
    const salt = await bcrypt.genSalt();
    const pwdHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: pwdHash,
      picture_path: filename,
      friends,
      location,
      occupation,
      viewed_profile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    const token = await jwt.sign(
      { sub: savedUser._id, iat: Date.now(), email: savedUser.email },
      process.env.JWT_SECRET
    );
    const extractedFriends = await extractFriends(savedUser.friends);

    res
      .status(201)
      .json({ token, user: { ...savedUser, friends: extractedFriends } });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, msg: "ERROR_CREATING_USER_IN_DB" });
  }
};
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        msg: "NON-EXISTENT USER...",
        user,
        body: { ...req.body },
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ msg: "INVALID_CREDENTIALS" });
    const token = await jwt.sign(
      { sub: user._id, iat: Date.now(), email: user.email },
      process.env.JWT_SECRET
    );
    const extractedFriends = await extractFriends(user.friends);
    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        picture_path: user.picture_path,
        friends: extractedFriends,
        location: user.location,
        occupation: user.occupation,
        viewed_profile: user.viewed_profile,
        impressions: user.impressions,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, msg: "ERROR_CREATING_USER_IN_DB" });
  }
};
