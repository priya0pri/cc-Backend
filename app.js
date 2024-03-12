const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes/api/book");
const formRoute = require("./routes/api/form");
const serviceRoute = require("./routes/api/service");
const userRoute = require("./routes/api/user");
const messageRouter = require("./routes/api/message");
const twilioRoute = require("./routes/api/twilio");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// use the cors middleware with the
// origin and credentials options
app.use(cors({ origin: true, credentials: true }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use the routes module as a middleware
// for the /api/books path
// Initialize Twilio client

app.use("/api/books", routes);
app.use("/api/form", formRoute);
app.use("/api", serviceRoute);
app.use("/", userRoute);
app.use("/", messageRouter);
app.use("/", twilioRoute);

// Connect Database
connectDB();

app.get("/", (req, res) => res.send("New app"));
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
