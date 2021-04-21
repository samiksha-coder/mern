const { model, Schema } = require("mongoose");
const Joi = require("joi");
const config = require("config");

const Transaction = model(
  "Transaction",
  new Schema({
    button: {
      type: Schema.Types.ObjectId,
      ref: "Button",
      required: true,
      validate: {
        validator: function (_id) {
          return new Promise(function (resolve, reject) {
            let button = model("Button");
            button
              .findOne({ _id })
              .then((result) => resolve(result))
              .catch((error) => reject(error));
          });
        },
        message: "Could not find button.",
      },
    },
    date: { type: Date, default: Date.now },
    type: { type: String, enum: config.ENUM.TX_TYPE, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, enum: config.ENUM.UNIT, required: true },
  })
);

const schema = Joi.object({
  button: Joi.string().required(),
  type: Joi.string()
    .valid(...config.ENUM.TX_TYPE)
    .required(),
  quantity: Joi.number().min(0.1).required(),
  unit: Joi.string()
    .valid(...config.ENUM.UNIT)
    .required(),
});

/**
 * Validates the transaction input.
 * @param {Object} input to validate.
 * @returns {Object} the errors encountered if any.
 */
const validateTransaction = (input) => {
  return schema.validate(input, { abortEarly: false, stripUnknown: true });
};

const saveTransaction = async (input) => {
  const { button, type, quantity, unit } = input;
  let transaction = new Transaction({
    button,
    type,
    quantity,
    unit,
  });
  return await transaction.save();
};

const findTransaction = async (query) => {
  return await Transaction.find(query).populate("button").sort("-date");
};

module.exports = {
  Transaction,
  validateTransaction,
  saveTransaction,
  findTransaction,
};
