const express = require("express");
const router = express.Router();
const {
  validateStorage,
  Storage,
  saveStorage,
  findStorage,
  updateStorage,
} = require("../../models/storages");

router.post("/", async (request, response) => {
  let input = request.body;
  if (typeof input.button === "string") input.button = JSON.parse(input.button);
  const { error } = validateStorage(input);
  if (error)
    return response
      .type("text/html")
      .status(400)
      .send(error.details[0].message);
  try {
    let storages = await findStorage({
      button: input.button,
      unit: input.unit,
    });
    let savedStorages = [];
    for (let index in storages) {
      const saved = await updateStorage({ _id: storages[index]._id }, input);
      savedStorages.push(saved);
    }
    if (storages.length === 0) {
      const saved = await saveStorage(input);
      savedStorages.push(saved);
    }
    response.type("application/json").status(200).send(savedStorages);
  } catch (error) {
    response.status(400).type("text/html").send(error.message);
  }
});

router.put("/", async (request, response) => {
  let input = request.body;
  if (typeof input.button === "string") input.button = JSON.parse(input.button);
  const { error } = validateStorage(input);
  if (error)
    return response
      .type("text/html")
      .status(400)
      .send(error.details[0].message);
  try {
    let { _id } = input;
    updateStorage({ _id }, input);
  } catch (error) {
    response.status(400).type("text/html").send(error.message);
  }
});

router.get("/", async (request, response) => {
  try {
    const { query } = request;
    if (query && query.id) {
      query._id = query.id;
      delete query.id;
    }
    const storage = await findStorage(query);
    response.status(200).send(storage);
  } catch (error) {
    response.send(error.message);
  }
});

router.post("/validate", async (request, response) => {
  try {
    const error = validateStorage(request.body);
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
      const button = await Storage.deleteOne(query);
      response.status(200).send(button);
    } else {
      return response.send("Invalid query").status(400);
    }
  } catch (error) {
    response.send(error.message);
  }
});

module.exports = router;
