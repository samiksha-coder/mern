const mongoose = require("mongoose");
const Joi = require("joi");

const Button = mongoose.model(
  "Button",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 100 },
    material: { type: String, required: true },
    polish: { type: String, length: 10, required: true },
    image: { type: Buffer, contentType: String },
  })
);

const schema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  material: Joi.string().required().min(3).max(100),
  polish: Joi.string().required().min(3).max(100),
});

/**
 * Validates the button input.
 * @param {Object} input to validate.
 * @returns {Object} the errors encountered if any.
 */
const validateButton = (input) => {
  try {
    return schema.validate(input, { abortEarly: false });
  } catch (e) {
    return e;
  }
};

module.exports = { Button, validateButton };
