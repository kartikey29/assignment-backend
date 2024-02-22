const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.passwordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
