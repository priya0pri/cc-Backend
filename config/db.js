const mongoose = require("mongoose");
const db =
  "mongodb+srv://priyar:bucUs7GzALh9YBwX@cluster1.bmexehw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
/* Replace <password> with your database password */

mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message, "connection err");
    process.exit(1);
  }
};
module.exports = connectDB;
