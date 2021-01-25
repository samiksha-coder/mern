const express = require("express");
const router = express.Router();
const {
  validateCustomer,
  getCustomerOptions,
  findCustomer,
  saveCustomer,
} = require("../../models/customers");
const _ = require("lodash");
const replaceID = require("../../models/commons");

// router.get("/", (request, response) =>
//   response.status(200).type("html").send("hello")
// );

router.post("/", async (request, response) => {
  const { error } = validateCustomer(request.body);
  if (error) return response.status(400).send(error.details[0].message);
  try {
    const customer = await saveCustomer(request.body);
    response.status(200).send(customer);
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
    const customer = await findCustomer(query);
    response.status(200).send(customer);
  } catch (error) {
    response.send(error.message);
  }
});

router.get("/options", async (request, response) => {
  try {
    const { query } = request;
    if (query && query.id) {
      query._id = query.id;
      delete query.id;
    }
    const customer = await getCustomerOptions(query);
    response.status(200).send(customer);
  } catch (error) {
    response.send(error.message);
  }
});

module.exports = router;
