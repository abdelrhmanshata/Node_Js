const { body } = require("express-validator");

const validationSchema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is require")
      .isLength({ min: 5, max: 20 })
      .withMessage("Title min length 5 digit"),
    body("price")
      .notEmpty()
      .withMessage("Price is require"),
  ];
};

module.exports = { validationSchema };
