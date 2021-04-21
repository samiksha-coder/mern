/**
 * Tries to parse input for JSON objects.
 * @param {Object} input to parse.
 * @returns {Object} parsed JSON.
 */
const tryParseJSON = (input) => {
  try {
    return JSON.parse(input);
  } catch (error) {
    return null;
  }
};

/**
 * Tries to parse input for float.
 * @param {Object} input to parse.
 * @returns {Object} parsed number.
 */
const tryParseFloat = (input) => {
  try {
    return parseFloat(input);
  } catch (error) {
    return null;
  }
};

module.exports = {
  tryParseJSON,
  tryParseFloat,
};
