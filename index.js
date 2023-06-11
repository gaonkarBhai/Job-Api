// 10.6.2023

require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Database
const conn = require('./database/conn')

// Router
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/job");

// Middleware
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/job", jobRouter);

// comman routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Happy coding" });
});
app.get("*", (req, res) => {
  res.status(404).json({ message: "Page not found!" });
});

const start = () => {
  try {
    conn();
    app.listen(port, () => console.log("Server is live"));
  } catch (error) {
    console.log(error);
  }
};

start();
