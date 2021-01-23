const mongoose = require("mongoose");
const Joi = require("joi");
const { Button, buttonSchema } = require("./buttons");
const { Customer, customerSchema } = require("./customers");

const Transaction = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    button: { type: Button, required: true },
    customer: { type: Customer, required: true },
    date: { type: Date, default: new Date() },
    type: { type: String, enum: ["sell", "buy"], required: true },
  })
);

const schema = Joi.object({
  button: buttonSchema,
  customer: customerSchema,
  date: Joi.date(),
  type: Joi.string().valid("sell", "buy"),
});

/**
 * Validates the user input.
 * @param {Object} input to validate.
 * @returns {Object} the errors encountered if any.
 */
const validateTransaction = (input) => {
  return schema.validate(input, { abortEarly: false });
};

exports.Transaction = Transaction;
exports.validateTransaction = validateTransaction;
