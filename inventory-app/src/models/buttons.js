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
  name: Joi.string().required(),
  material: Joi.string().required(),
  polish: Joi.string().required(),
});

/**
 * Validates the button input.
 * @param {Object} input to validate.
 * @returns {Object} the errors encountered if any.
 */
const validateButton = (input) => {
  return schema.validate(input, { abortEarly: false });
};

exports.Button = Button;
exports.validateButton = validateButton;
