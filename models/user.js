const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  fullName: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  sex: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  seenItem: {
    type: [String],
    ref: "Item",
  },
  token: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), "secret");
  user.token = token;
  user.save((err, user) => {
    if (err) return cb(err);
    console.log(user);
    return cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  let User = this;

  jwt.verify(token, "secret", function (err, decode) {
    User.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
