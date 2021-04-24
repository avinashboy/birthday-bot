const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()
const jwtExpirySeconds = 20;

router.post("/", (req, res) => {
  if (req.body.inputPassword === process.env.PASSWORD) {
    const token = jwt.sign({ user: req.body.inputName }, process.env.TOKEN, { algorithm: 'HS256', expiresIn: jwtExpirySeconds * 60 })
    return res.status(200).json({ auth: token, name: req.body.inputName });
  }
  return res.status(403).json({ error: "Wrong password" })
})

module.exports = router;