require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const connect = require("./src/db/connect");
const userRoute = require("./src/routes/user.route");
// const taskRoute = require("./src/routes/task.route");
// const subTaskRoute = require("./src/routes/subTask.route");
// const errorHandler = require("./src/middleware/errorHandling");

let app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRoute);
// app.use("/task", taskRoute);
// app.use("/sub-task", subTaskRoute);

app.use("*", (req, res) => {
  return res.status(404).send("<h1>Invalid api</h1>");
});
// app.use(errorHandler);

connect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server is running on port 5000");
    });
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
