const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./APIs/userAPI");
const taskRouter = require("./APIs/taskAPI");
const PORT = 8002;

const whiteList = ["http://localhost:5173"];
const corsOptions = {
  origin: [{ whiteList }],
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
