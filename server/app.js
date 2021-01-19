require("dotenv").config();

// express
const express = require("express");
const routes = require("./routes");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

// mongoose odm
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/expenseTracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection to database error:"));
db.once("open", function () {
  console.log("Connection to database is successful.");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.disable("etag");

app.use(morgan("dev"));

// routing
app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log("Server is up and running.");
});
