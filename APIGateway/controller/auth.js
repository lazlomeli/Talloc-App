require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN);
}

const authenticateToken = (req, res, next) => {
  let token = req.cookies.talloc_user_cookie_token;

  if (token == null) return res.status(401).json({ error: "Token missing" });

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err)
      return res.status(403).json({ error: "The token you have is invalid" });
    req.user = user;
    next();
  });
};

const clearCookieToken = (req, res, next) => {
  let ck = req.cookies.talloc_user_cookie_token;
  res.clearCookie(ck);
  next();
};

module.exports = { authenticateToken, generateAccessToken };
