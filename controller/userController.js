const User = require('../models/User');
const jwtConfig = require('../config/jwtConfig');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = new User({ username, email, password, role });
    await newUser.save();
    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating user', error });
  }
};

//User login
exports.userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(401).json({ success: false, message: 'Invalid username or password.' });
        }
    
        // Check if the password matches
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return res.status(401).json({ success: false, message: 'Invalid username or password.' });
        }
    
        // Generate JWT token
        const token = jwtConfig.generateToken(user);
    
        res.status(200).json({ success: true, token, user: { id: user._id, username: user.username } });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
      }
};

