const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../Model/User');
const { sendVerificationEmail } = require('../utils/email'); 

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = new User({ email, password });
    await user.save();

    // Generate verification token
    const verificationToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    console.log(verificationToken);
    user.verificationToken = verificationToken;
    await user.save();

    // Send verification email
    await sendVerificationEmail(user);

    res.status(201).json({ message: 'User created. Verification email sent.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const verifyEmail = async (req, res) => {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.isVerified = true;
      user.verificationToken = null;
      await user.save();
  
      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
  

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) {
      return res.status(401).json({ message: 'Invalid credentials or email not verified' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { signup, verifyEmail, login };
