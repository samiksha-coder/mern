const { model, Schema } = require("mongoose");
const Joi = require("joi");
const { buttonSchema } = require("./buttons");
const { customerSchema } = require("./customers");
const config = require("config");

const Transaction = model(
  "Transaction",
  new Schema({
    button: { type: Schema.Types.ObjectId, ref: "Button", required: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, enum: config.ENUM.TX_TYPE, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, enum: config.ENUM.UNIT, required: true },
  })
);

const schema = Joi.object({
  button: buttonSchema,
  customer: customerSchema,
  type: Joi.string()
    .valid(...config.ENUM.TX_TYPE)
    .required(),
  quantity: Joi.number().required(),
  unit: Joi.string()
    .valid(...config.ENUM.UNIT)
    .required(),
});

/**
 * Validates the user input.
 * @param {Object} input to validate.
 * @returns {Object} the errors encountered if any.
 */
const validateTransaction = (input) => {
  return schema.validate(input, { abortEarly: false, stripUnknown: true });
};

exports.Transaction = Transaction;
exports.validateTransaction = validateTransaction;
