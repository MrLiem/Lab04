const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { User } = require("../models/user");

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req._id,
    email: req.user.email,
    isAuth: true,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userData) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, userData });
  });
});

router.post("/login", (req, res) => {
  // find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(400).json(err);
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });
    }

    //comparePassword
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: "wrong password" });
      }
    });

    //generate Token
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ loginSuccess: true, x_auth: user.token });
    });
  });
});

router.post("/logout", auth, (req, res) => {
  console.log("logout route", "ok");
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      useFindAndModify: false,
    },
    { token: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, message: err });
      return res.status(200).json({ success: true });
    }
  );
});

module.exports = router;
