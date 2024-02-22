const mongoose = require("mongoose");
const connect = async () => {
  await mongoose.connect(process.env.CONNECTION);
  console.log("DB connected");
};
module.exports = connect;
