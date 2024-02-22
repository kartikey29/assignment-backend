const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      throw { message: "user not found" };
    }

    if (!(await user.passwordMatch(password))) {
      throw { message: "password doesn't match" };
    }

    let userObj = user.toObject();
    delete userObj.password;

    const token = jwt.sign({ _id: user._id }, process.env.JWT);

    return res
      .status(200)
      .send({ message: "login success", data: userObj, token });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User({
      name: name,
      password: hashedPassword,
      email: email,
    });
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT);

    let userObj = newUser.toObject();
    delete userObj.password;

    return res
      .status(201)
      .send({ message: "signup success", data: userObj, token });
  } catch (err) {
    if (err.code == 11000) {
      next({ err: { message: "Phone number must be unique" } });
    }
    return res.status(500).send(err);
  }
};

module.exports = { createUser, login };
