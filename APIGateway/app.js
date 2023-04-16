
require('dotenv').config({path: './.env'})
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./apis/userAPI");
const taskRouter = require("./apis/taskAPI");

const corsOptions = {
  origin: process.env.FRONTEND_API_URL,
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.listen(process.env.GATEWAY_API_PORT, () => {
  console.log(`\n🚀 Server running on port ${process.env.GATEWAY_API_PORT}\n`)
});
