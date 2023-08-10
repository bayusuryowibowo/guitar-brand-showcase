const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function generateAccessToken(user) {
  const { id, username, email, role } = user;
  return jwt.sign({ id, username, email, role }, JWT_SECRET);
}

function verifyAccessToken(access_token) {
  return jwt.verify(access_token, JWT_SECRET);
}

module.exports = { generateAccessToken, verifyAccessToken };
