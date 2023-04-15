const express = require("express");
const cors = require("cors");
const usersRouter = require("./routers/user");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
const app = express();

const PORT = 3000;
const GATEWAY_API_APP = "http://gateway_api:8002"

const corsOptions = {
  origin: GATEWAY_API_APP,
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

db.connectToDB();

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(usersRouter);

app.listen(PORT, () => console.log(`\n🚀 Server running on port ${PORT}\n`));
