const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const { getUserCollection } = require('../Model/userModel');

exports.createUser = async (req, res) => {
  const users = getUserCollection();
  const { username, email, password, profileImage } = req.body;
  console.log('Incoming profile image:', profileImage?.slice(0,50));
  console.log('ProfileImage length:', profileImage ? profileImage.length : 'NO IMAGE');

  console.log('REQ.BODY:', Object.keys(req.body));


  const existing = await users.findOne({ email });
  if (existing) return res.status(400).send('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await users.insertOne({
    username,
    email,
    password: hashedPassword,
    profileImage
  });

  res.json({ insertedId: result.insertedId });
};

exports.listUsers = async (req, res) => {
  const users = getUserCollection();
  const allUsers = await users.find({}).toArray();
  res.json(allUsers);
};

exports.getUserById = async (req, res) => {
  const users = getUserCollection();
  const user = await users.findOne({ _id: new ObjectId(req.params.id) });
  if (!user) return res.status(404).send('User not found');
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const users = getUserCollection();
  const { username, email, profileImage } = req.body;

  const updateFields = {};
  if (username !== undefined) updateFields.username = username;
  if (email !== undefined) updateFields.email = email;
  if (profileImage !== undefined) updateFields.profileImage = profileImage;

  const result = await users.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: updateFields }
  );

  if (result.matchedCount === 0) return res.status(404).send('User not found');
  res.send('User updated');
};

exports.deleteUser = async (req, res) => {
  const users = getUserCollection();
  const result = await users.deleteOne({ _id: new ObjectId(req.params.id) });
  if (result.deletedCount === 0) return res.status(404).send('User not found');
  res.send('User deleted');
};

const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.loginUser = async (req, res) => {
  const users = getUserCollection();
  const { email, password } = req.body;

  const user = await users.findOne({ email });
  if (!user) return res.status(404).send('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send('Invalid password');

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ message: 'Login successful', token });
};
