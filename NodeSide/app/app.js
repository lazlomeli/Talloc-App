require('dotenv').config({path: '../.env'})
const express = require("express");
const cors = require("cors");
const usersRouter = require("./routers/user");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
const app = express();

const corsOptions = {
  // origin: process.env.GATEWAY_API_URL_DOCKER,
  origin: process.env.GATEWAY_API_URL,
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

db.connectToDB();

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(usersRouter);

app.listen(process.env.NODE_APP_PORT, () => {
  console.log(`\n🚀 Server running on port ${process.env.NODE_APP_PORT}\n`)
});
