const express = require("express");
const { Button } = require("../../models/buttons");
const { Customer } = require("../../models/customers");
const router = express.Router();
const {
  Transaction,
  validateTransaction,
} = require("../../models/transactions");

router.post("/", async (request, response) => {
  const { error } = validateTransaction(request.body);
  if (error) return response.status(400).send(error.details[0].message);
  const { button, customer, type, date } = request.body;
  try {
    let buttonObject = await Button.find(request.body.button);
    console.log("oldButton", buttonObject);
    if (!buttonObject || buttonObject.length === 0) {
    }
    let customerObject = await Customer.find(request.body.customer);

    if (!oldButton || oldButton.length === 0) {
      let transaction = new Transaction({
        button,
        customer,
        type,
        date,
      });
      await transaction.save();
      response.status(200).send(transaction);
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
    const button = await Transaction.find(query);
    response.status(200).send(button);
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
