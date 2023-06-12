const UserModel = require("../model/userSchema")

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({
        message: "The request is missing the required parameter value",
        success: false,
      });
  // mongoose middleware for hashing password comes here
  const user = await UserModel.create(req.body);
  // mongoose middleware for creating JWT token comes here
  const token = await user.createJWT();
  res.status(201).json({ token, success: true, user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      message: "invalid email or password",
      success: false,
    });
  const user = await UserModel.findOne({ email });
  if (!user)
    return res.status(401).json({
      message: "User does not exists",
      success: false,
    });
  // comparing the password comes here
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect)
    return res.status(401).json({
      message: "invalid password or email",
      success: false,
    });
  const token = await user.createJWT();
  res.status(200).json({ token, success: true, user });
};

module.exports = { register, login };
