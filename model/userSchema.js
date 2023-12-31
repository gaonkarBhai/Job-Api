const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name must be provided"],
    minlength: 2,
    maxlength: 40,
  },
  email: {
    type: String,
    required: [true, "email must be provided"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "invalid email address",
    ],
    unique: [true, "duplication of email ID"],
  },
  password: {
    type: String,
    required: [true, "password must be provided"],
  },
});

// Before save password is hashed
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

// after user register token is created -> instance functions
userSchema.methods.createJWT = async function () {
  return jwt.sign(
    { userId: this._id, userName: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

// comparing password -> instance functions
userSchema.methods.comparePassword = async function (psw) {
  const isMatch = await bcrypt.compare(psw, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
