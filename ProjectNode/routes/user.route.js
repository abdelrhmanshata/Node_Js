const express = require("express");
const router = express.Router();
let controller = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");

router.route("/").get(
  verifyToken ,
  controller.getAllUser
);

router.route("/register").post(controller.register);

router.route("/login").post(controller.login);

module.exports = router;
