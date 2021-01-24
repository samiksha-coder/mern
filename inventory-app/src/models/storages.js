const { model, Schema } = require("mongoose");
const Joi = require("joi");
const { buttonSchema } = require("./buttons");

const Storage = model(
  "Storage",
  new Schema({
    button: { type: Schema.Types.ObjectId, ref: "Button", required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    updated: { type: Date, default: Date.now },
  })
);

const schema = Joi.object({
  button: buttonSchema.required(),
  quantity: Joi.number().required(),
  unit: Joi.string().required(),
});

/**
 * Validates the user input.
 * @param {Object} input to validate.
 * @returns {Object} the errors encountered if any.
 */
const validateStorage = (input) => {
  return schema.validate(input, { abortEarly: false });
};

const saveStorage = async (input) => {
  const { button, quantity, unit } = input;
  console.log("button", button);
  let storage = new Storage({
    button: button._id,
    quantity,
    unit,
  });
  return await storage.save();
};
const updateStorage = async (input) => {
  const { button, unit, quantity } = input;
  console.log("button", button);
  let storage = (await Storage.findOneAndUpdate({ button, unit })).$set({
    quantity,
  });
  return storage;
};
const findStorage = async (input) => {
  return await Storage.find(input)
    .populate("button")
    .sort([
      ["updated", -1],
      ["button._name", 1],
    ]);
};

module.exports = {
  Storage,
  validateStorage,
  findStorage,
  saveStorage,
  updateStorage,
};
