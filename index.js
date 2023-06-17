// 10.6.2023

require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// security modules
const cors = require('cors')
const helmet = require('helmet')
const expressRateLimit = require('express-rate-limit')

// swagger-ui
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./swagger.yaml')

const athenticateUser = require('./middleware/authentication')

// Database
const conn = require('./database/conn')

// Router
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/job");

// Middleware

// # this middleware cusing error while deploying in vercel : use can add locally or for you own domain (won't work in vercel)
// app.set('trust proxy',1)
// app.use(expressRateLimit({
//     windowMs:15*60*1000,
//     max:100,
//   }))
// app.use(helmet())

app.use(express.json());
app.use(cors())

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/job", athenticateUser, jobRouter);

// comman routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Happy coding" });
});

// swagger-ui middleware
app.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerDoc))
app.get("*", (req, res) => {
  res.status(404).json({ message: "Page not found!" });
});




// __ main() __
const start = () => {
  try {
    conn(); // db config
    app.listen(port, () => console.log("Server is live"));
  } catch (error) {
    console.log(error);
  }
};

start();
