const express = require("express");
const router = express.Router();
const { validateCustomer, Customer } = require("../../models/customers");
const _ = require("lodash");
const replaceID = require("../../models/commons");

// router.get("/", (request, response) =>
//   response.status(200).type("html").send("hello")
// );

router.post("/", async (request, response) => {
  const { error } = validateCustomer(request.body);
  if (error) return response.status(400).send(error.details[0].message);
  const { name, phone, address, email } = request.body;
  try {
    let customer = new Customer({
      name,
      phone,
      address,
      email,
    });
    await customer.save();
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
    const customer = await Customer.find(query);
    response.status(200).send(customer);
  } catch (error) {
    response.send(error.message);
  }
});

module.exports = router;
