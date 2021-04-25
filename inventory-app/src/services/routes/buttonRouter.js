const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const {
  validateButton,
  Button,
  saveButton,
  findButton,
} = require("../../models/buttons");
var storage = multer.memoryStorage();
// var upload = multer({ storage: storage });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(
//       null,
//       "C:\\Users\\sagoyal\\mern_workspace\\inventory-app\\src\\services\\images"
//     );
//   },
//   filename: function (req, file, cb) {
//     cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
//   if (allowedFileTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

let upload = multer({ storage });

router.post("/", upload.single("photo"), async (request, response) => {
  const { body } = request;
  const { error } = validateButton(body);
  if (error)
    return response
      .type("text/html")
      .status(400)
      .send(error.details[0].message);
  try {
    let oldButton = await findButton(body);
    console.log("oldButton", oldButton);
    if (!oldButton || oldButton.length === 0) {
      const button = await saveButton(body);
      response.type("application/json").status(200).send(button);
    } else {
      response.status(400).type("text/html");
      throw new Error("Button exists.\n" + oldButton.join(", "));
    }
  } catch (error) {
    response.status(400).type("text/html").send(error.message);
  }
});

router.get("/", async (request, response) => {
  try {
    const { query } = request;
    if (query && query.id) {
      query._id = query.id;
      delete query.id;
    }
    const button = await findButton(query);
    response.status(200).send(button);
  } catch (error) {
    response.send(error.message);
  }
});

router.post("/validate", async (request, response) => {
  try {
    const error = validateButton(request.body);
    response.status(200).send(error);
  } catch (error) {
    response.send(error.message).status(400);
  }
});

router.delete("/", async (request, response) => {
  try {
    const query = request.body;
    if (query && query.id) {
      query._id = query.id;
      delete query.id;
      const button = await Button.deleteOne(query);
      response.status(200).send(button);
    } else {
      return response.send("Invalid query").status(400);
    }
  } catch (error) {
    response.send(error.message);
  }
});

module.exports = router;
