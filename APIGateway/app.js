const express = require("express");
const cors = require("cors");
const userRouter = require("./APIs/userAPI");
const taskRouter = require("./APIs/taskAPI");
const PORT = 8002;

/**
 * API Gateway app
 */

const whiteList = ["http://localhost:5173"];

app = express();
app.use(cors({ origin: whiteList }));
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.listen(PORT, () => console.log(`\n🚀 Server running on port ${PORT}\n`));
