const { User } = require("../models/user");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
