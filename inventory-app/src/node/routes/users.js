const express = require("express");

const router = express.Router();

router.get("/", (request, response) => response.type("html").send("hello"));

module.exports = router;
