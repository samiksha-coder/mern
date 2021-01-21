const mongoose = require("mongoose");
const Joi = require("joi");
const { Button } = require("./buttons");
const { Customer } = require("./customers");
const { emailRegex, phoneRegex } = require("./commons");

const Transaction = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    button: { type: Button, required: true },
    with: { type: Customer, required: true },
    date: { type: Date, default: new Date() },
    type: { type: String, enum: ["sell", "buy"], required: true },
  })
);

const schema = Joi.object({
  button: Joi.object({
    name: Joi.string().required(),
    material: Joi.string().required(),
    polish: Joi.string().required(),
  }),
  with: Joi.object({
    name: Joi.string().required().min(3).max(100),
    email: Joi.string().regex(emailRegex),
    phone: Joi.string().regex(phoneRegex),
    address: Joi.string().max(255),
  }),
  date: Joi.date(),
  type: Joi.string().valid("sell", "buy"),
});

/**
 * Validates the user input.
 * @param {Object} input to validate.
 * @returns {Object} the errors encountered if any.
 */
const validateCustomer = (input) => {
  return schema.validate(input, { abortEarly: false });
};

exports.Customer = Transaction;
exports.validateCustomer = validateCustomer;
