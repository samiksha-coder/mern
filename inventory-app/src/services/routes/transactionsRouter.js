const express = require("express");
const { findButton, saveButton } = require("../../models/buttons");
const { findCustomer, saveCustomer } = require("../../models/customers");
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
    let buttonObject = await findButton(button);
    console.log("oldButton", buttonObject);
    if (!buttonObject || buttonObject.length === 0) {
      buttonObject = await saveButton(button);
    }
    let customerObject = await findCustomer(customer);
    if (!customerObject || customerObject.length === 0) {
      customerObject = await saveCustomer(customer);
    }
    let transaction = new Transaction({
      buttonObject,
      customerObject,
      type,
      date,
    });
    await transaction.save();
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
    const transaction = await Transaction.find(query).populate([
      "Customer",
      "Button",
    ]);
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
