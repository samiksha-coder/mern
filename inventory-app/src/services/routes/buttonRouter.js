const express = require("express");
const router = express.Router();
const { validateButton, Button } = require("../../models/buttons");

router.get("/", (request, response) =>
  response.status(200).type("html").send("hello")
);

router.post("/", async (request, response) => {
  const { error } = validateButton(request.body);
  if (error) return response.status(400).send(error.details[0].message);
  const { name, material, polish } = request.body;
  try {
    let button = new Button({
      name,
      material,
      polish,
    });
    await button.save();
    response.status(200).send(button);
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

module.exports = router;
