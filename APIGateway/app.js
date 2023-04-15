const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./apis/userAPI");
const taskRouter = require("./apis/taskAPI");

const PORT = 8002;
// const FRONTEND_APP = "http://frontend:5173"
const FRONTEND_APP = "http://localhost:5173"

const corsOptions = {
  origin: FRONTEND_APP,
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.listen(PORT, () => console.log(`\n🚀 Server running on port ${PORT}\n`));
