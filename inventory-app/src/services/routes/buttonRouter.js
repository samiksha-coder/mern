const express = require("express");
const router = express.Router();
const { validateButton, Button } = require("../../models/buttons");

router.post("/", async (request, response) => {
  const { error } = validateButton(request.body);
  if (error) return response.status(400).send(error.details[0].message);
  const { name, material, polish } = request.body;
  try {
    let oldButton = await Button.find(request.body);
    console.log("oldButton", oldButton);
    if (!oldButton || oldButton.length === 0) {
      let button = new Button({
        name,
        material,
        polish,
      });
      await button.save();
      response.status(200).send(button);
    } else {
      response.setHeader(("Content-Type", "text/html"));
      throw new Error("Button exists.\n" + oldButton.join(", "));
    }
  } catch (error) {
    response.send(error.message);
  }
});

router.get("/", async (request, response) => {
  try {
    const { query } = request;
    if (query && query.id) {
      query._id = query.id;
      delete query.id;
    }
    const button = await Button.find(query);
    response.status(200).send(button);
  } catch (error) {
    response.send(error.message);
  }
});

router.post("/validate", async (request, response) => {
  try {
    const error = validateButton(request.body);
    response.status(200).send(error);
  } catch (error) {
    response.send(error.message).status(400);
  }
});

router.delete("/", async (request, response) => {
  try {
    const query = request.body;
    if (query && query.id) {
      query._id = query.id;
      delete query.id;
      const button = await Button.deleteOne(query);
      response.status(200).send(button);
    } else {
      return response.send("Invalid query").status(400);
    }
  } catch (error) {
    response.send(error.message);
  }
});

module.exports = router;
