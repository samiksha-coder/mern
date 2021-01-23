const mongoose = require("mongoose");
const Joi = require("joi");
const { emailRegex, phoneRegex } = require("./commons");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 100 },
    email: {
      type: String,
      default: false,
      validate: {
        validator: function (value) {
          return emailRegex.test(value);
        },
        message: "Please enter a proper email",
      },
    },
    phone: {
      type: String,
      length: 10,
      required: true,
      validate: {
        validator: function (value) {
          return phoneRegex.test(value);
        },
        message: "Please enter a proper phone",
      },
    },
    address: { type: String, maxlength: 255 },
  })
);

const schema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  email: Joi.string().regex(emailRegex),
  phone: Joi.string().regex(phoneRegex),
  address: Joi.string().max(255),
});

/**
 * Validates the user input.
 * @param {Object} input to validate.
 * @returns {Object} the errors encountered if any.
 */
const validateCustomer = (input) => {
  return schema.validate(input, { abortEarly: false });
};

module.exports = { Customer, validateCustomer, customerSchema: schema };
