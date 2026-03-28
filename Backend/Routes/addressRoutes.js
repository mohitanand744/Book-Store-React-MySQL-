const express = require("express");
const {
  getStates,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../Controllers/addressController");
const verifyToken = require("../Middleware/verifyToken");
const {
  createAddressValidator,
  updateAddressValidator,
} = require("../Validators/addressValidator");
const { validate } = require("../Validators/validate");

const router = express.Router();

router.get("/states", getStates);
router.get("/", verifyToken, getAddresses);
router.post("/", verifyToken, createAddressValidator, validate, addAddress);
router.put(
  "/:id",
  verifyToken,
  updateAddressValidator,
  validate,
  updateAddress,
);
router.delete("/:id", verifyToken, deleteAddress);

module.exports = router;
