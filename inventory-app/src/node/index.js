const appDebugger = require("debug")("app.startup");
const validationDebuger = require("debug")("app.validation");
const config = require("config");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const logger = require("./logger");
const authenticator = require("./authenticator");
const courses = require("./routes/courses");
const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", home);

const port = process.env.PORT || 3100;
validationDebuger("config.name", config.get("name"));
validationDebuger("config.mail", config.get("mail"));

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected"))
  .catch(() => console.log("Ran into error"));

if (app.get("env") === "development") {
  appDebugger(`debugging on ${app.get("env")}`);
}

app.listen(port, () => {
  appDebugger(`listening on ${port}`);
});
