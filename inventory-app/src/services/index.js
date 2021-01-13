const appDebugger = require("debug")("app.startup");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
var cors = require("cors");

const userRouter = require("./routes/users");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);

const port = process.env.PORT || 3100;

mongoose
  .connect("mongodb://localhost/inventory", {
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
