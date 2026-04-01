const express = require("express");
const {
  getStates,
  getUserAddresses,
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
router.get("/user-addresses", verifyToken, getUserAddresses);
router.post(
  "/create",
  verifyToken,
  createAddressValidator,
  validate,
  addAddress,
);
router.put(
  "/update/:id",
  verifyToken,
  updateAddressValidator,
  validate,
  updateAddress,
);
router.delete("/:id", verifyToken, deleteAddress);

module.exports = router;
