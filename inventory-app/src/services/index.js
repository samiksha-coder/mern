const appDebugger = require("debug")("app.startup");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
const multer = require("multer");

process.env["NODE_CONFIG_DIR"] = "./src/config";
const config = require("config");

const customerRouter = require("./routes/customerRouter");
const buttonRouter = require("./routes/buttonRouter");
const transactionsRouter = require("./routes/transactionsRouter");
const storageRouter = require("./routes/storageRouter");
const fileFilter = require("../utils/multerUtils");
const storage = multer.memoryStorage();
let upload = multer({ storage, fileFilter });

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(upload.array());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(config.API.CUSTOMER, customerRouter);
app.use(config.API.BUTTON, buttonRouter);
app.use(config.API.TRANSACTION, transactionsRouter);
app.use(config.API.STORAGE, storageRouter);

app.use(function (req, res, next) {
  res.status(404).send("Unable to find the requested resource!");
});

const port = process.env.PORT || 3100;

console.log("config.SERVICE_URL", config.SERVICE_URL);

mongoose
  .connect(config.DATABASE_URL, {
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
