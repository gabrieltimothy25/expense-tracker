require("dotenv").config();

// express
const express = require("express");
const routes = require("./routes");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

// mongoose odm
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/expense-tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection to database error:"));
db.once("open", function () {
  console.log("Connection to database is successful.");
});

// routing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log("Server is up and running.");
});
