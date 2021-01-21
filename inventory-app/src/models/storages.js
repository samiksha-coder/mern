const mongoose = require("mongoose");
const Joi = require("joi");
const Button = require("./buttons");

const Storage = mongoose.model(
  "Storage",
  new mongoose.Schema({
    button: { type: Button, required: true },
    quantities: {
      quantity: { type: Number, required: true },
      unit: { type: String, required: true },
    },
  })
);

const schema = Joi.object({
  button: Joi.Object({
    name: Joi.string().required(),
    material: Joi.string().required(),
    polish: Joi.string().required(),
  }).required(),
  quantities: Joi.object({
    quantity: Joi.number().required(),
    unit: Joi.string().required(),
  }),
});

/**
 * Validates the user input.
 * @param {Object} input to validate.
 * @returns {Object} the errors encountered if any.
 */
const validateEntity = (input) => {
  return schema.validate(input, { abortEarly: false });
};

exports.Entity = Storage;
exports.validateEntity = validateEntity;
