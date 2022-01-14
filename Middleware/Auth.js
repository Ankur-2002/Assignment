const JWT = require('jsonwebtoken');
const JWT_SECRET = 'saljkf7q3458uhof7034y6ch';

const isAuth = async (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];

  // console.log(token, 'Token');
  if (!token) {
    return res.status(401).json({
      message: 'Access denied. No token provided',
    });
  }

  try {
    const decoded = JWT.decode(token, JWT_SECRET);
    console.log(decoded);
    console.log(Date.now() / 1000);
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({
        message: 'Access denied. Expired token',
      });
    }
    // console.log(decoded);
    req.user = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};

module.exports = {
  isAuth,
};
