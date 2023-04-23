require('dotenv').config({path: '../../.env'})
const mongoose = require("mongoose");
mongoose.set('strictQuery', false)

const connectToDB = () => {
  // mongoose.connect(process.env.MONGODB_URL_DOCKER, { useNewUrlParser: true });
  mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

  db = mongoose.connection;
  db.on("error", (err) => console.error(err));
  db.once("open", () => console.log("Connected to Database"));
};

module.exports = { connectToDB };
