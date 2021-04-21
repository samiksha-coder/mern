const { model, Schema } = require("mongoose");
const Joi = require("joi");
const config = require("config");
const { buttonSchema } = require("./buttons");
const { UNIT } = config.ENUM;

const Storage = model(
  "Storage",
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
    quantity: { type: Number, required: true },
    unit: { type: String, enum: UNIT, required: true },
    updated: { type: Date, default: Date.now },
  })
);

const schema = Joi.object({
  button: buttonSchema.required(),
  quantity: Joi.number().required(),
  unit: Joi.string()
    .valid(...UNIT)
    .required(),
});

/**
 * Validates the storage input.
 * @param {Object} input to validate.
 * @returns {Object} the errors encountered if any.
 */
const validateStorage = (input) => {
  return schema.validate(input, { abortEarly: false, stripUnknown: true });
};

const saveStorage = async (input) => {
  const { button, quantity, unit } = input;
  let storage = new Storage({
    button: button,
    quantity,
    unit,
  });
  return await storage.save();
};
const updateStorage = async (id, input) => {
  const { unit, quantity } = input;
  let storage = (await Storage.findByIdAndUpdate(id, { quantity, unit })).$set({
    updated: new Date(),
  });
  await storage.save();
  return await storage.populate("button");
};
const findStorage = async (input) => {
  return await Storage.find(input)
    .populate("button")
    .sort("-updated button._name");
};
const findStorageObject = async (input) => {
  return await Storage.findOne(input)
    .populate("button")
    .sort("-updated button._name");
};

module.exports = {
  Storage,
  validateStorage,
  findStorage,
  saveStorage,
  updateStorage,
  findStorageObject,
};
