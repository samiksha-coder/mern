const express = require("express");

const {
  findStorageObject,
  saveStorage,
  updateStorage,
} = require("../../models/storages");
const router = express.Router();
const {
  Transaction,
  validateTransaction,
  saveTransaction,
  findTransaction,
} = require("../../models/transactions");
const { tryParseJSON, tryParseFloat } = require("../../utils/conversionUtils");

router.post("/", async (request, response) => {
  let input = request.body;
  let { button, type, quantity, unit } = input;
  button = tryParseJSON(button);
  quantity = tryParseFloat(quantity);
  const { error } = validateTransaction(input);
  if (error) return response.status(400).send(error.details[0].message);
  try {
    let storageObject = await findStorageObject({ button: button._id, unit });
    if (!storageObject || storageObject.length === 0)
      storageObject = await saveStorage({ button, unit, quantity: 0 });

    let finalQuanity;
    if (type === "SELL") {
      finalQuanity = storageObject.quantity - quantity;
      if (finalQuanity < 0)
        return response.status(400).send("Negetive quantity transaction");
    }
    if (type === "BUY") finalQuanity = storageObject.quantity + quantity;

    let transaction = await saveTransaction({ button, type, quantity, unit });
    transaction.populate("button customer");

    await updateStorage(storageObject._id, {
      button: transaction.button,
      quantity: finalQuanity,
      unit,
    });

    response.status(200).send(transaction);
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
    const transaction = await findTransaction(query);
    response.status(200).send(transaction);
  } catch (error) {
    response.send(error.message);
  }
});

router.post("/validate", async (request, response) => {
  try {
    const error = validateTransaction(request.body);
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
      const button = await Transaction.deleteOne(query);
      response.status(200).send(button);
    } else {
      return response.send("Invalid query").status(400);
    }
  } catch (error) {
    response.send(error.message);
  }
});

module.exports = router;
