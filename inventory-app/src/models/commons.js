const emailRegex = new RegExp(
  /[a-z0-9!#$%&'*+/=.?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/im
);
const phoneRegex = new RegExp(/^\d{10}$|^\d{8}$/im);

const replaceID = (array) => {
  array._id = array.id;
  delete array.id;
};

module.exports.emailRegex = emailRegex;
module.exports.phoneRegex = phoneRegex;
module.exports.replaceID = replaceID;
