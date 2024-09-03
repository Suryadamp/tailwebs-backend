const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key'; // Replace with a strong secret key

// Function to generate a JWT token
exports.generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
  };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid token.' });
  }
};
