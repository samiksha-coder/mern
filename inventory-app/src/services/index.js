const appDebugger = require("debug")("app.startup");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
var cors = require("cors");

process.env["NODE_CONFIG_DIR"] = "./src/config";
const config = require("config");

const customerRouter = require("./routes/customerRouter");
const buttonRouter = require("./routes/buttonRouter");
const transactionsRouter = require("./routes/transactionsRouter");
const storageRouter = require("./routes/storageRouter");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(config.API.CUSTOMER, customerRouter);
app.use(config.API.BUTTON, buttonRouter);
app.use("/api/transactions", transactionsRouter);
app.use(config.API.STORAGE, storageRouter);

app.use(function (req, res, next) {
  res.status(404).send("Unable to find the requested resource!");
});

const port = process.env.PORT || 3100;

console.log("config.SERVICE_URL", config.SERVICE_URL);

mongoose
  .connect("mongodb://localhost/inventory", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected"))
  .catch((error) => console.log("Ran into error", error));

if (app.get("env") === "development") {
  appDebugger(`debugging on ${app.get("env")}`);
}

app.listen(port, () => {
  appDebugger(`listening on ${port}`);
});
