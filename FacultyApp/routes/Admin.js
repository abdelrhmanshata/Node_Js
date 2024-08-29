const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/AuthMWPermission");
const User = require("../models/UserModel");
// Middleware

// Reusable function to update user role
const updateUserRole = (userId, isAdmin, successMessage, res, next) => {
  User.findByIdAndUpdate(userId, { isAdmin }, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        res.status(200).send(successMessage);
      } else {
        res.status(404).send("User not found!");
      }
    })
    .catch((err) => {
      next(err);
    });
};

// PUT route to set user as admin
router.put("/:id", Auth, (req, res, next) => {
  updateUserRole(req.params.id, true, "User role is set to Admin.", res, next);
});

// DELETE route to remove admin role
router.delete("/:id", Auth, (req, res, next) => {
  updateUserRole(
    req.params.id,
    false,
    "User role is set to Normal.",
    res,
    next
  );
});

module.exports = router;
