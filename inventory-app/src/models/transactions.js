const { model, Schema } = require("mongoose");
const Joi = require("joi");
const { buttonSchema } = require("./buttons");
const { customerSchema } = require("./customers");

const Transaction = model(
  "Transaction",
  new Schema({
    button: { type: Schema.Types.ObjectId, ref: "Button", required: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    date: { type: Date, default: new Date() },
    type: { type: String, enum: ["sell", "buy"], required: true },
    quantity: { type: Number, required: true },
  })
);

const schema = Joi.object({
  button: buttonSchema,
  customer: customerSchema,
  date: Joi.date(),
  type: Joi.string().valid("sell", "buy"),
  quantity: Joi.number().required(),
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
