const jwt = require('jsonwebtoken'),
  dotenv = require('dotenv')
dotenv.config()

module.exports = function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send('access denied');

  try {
    const verifly = jwt.verify(token, process.env.TOKEN);
    req.user = verifly;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
}