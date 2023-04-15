const mongoose = require("mongoose");
mongoose.set('strictQuery', false)

const connectToDB = () => {
  // const dbName = "mongodb://127.0.0.1:27017/pstudioDB";
  const dbName = "mongodb://mongo:27017/tallocDB";

  mongoose.connect(dbName, { useNewUrlParser: true });

  db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("Connected to Database"));
};

module.exports = { connectToDB };
