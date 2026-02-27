const express = require("express");
const {
  getStates,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../Controllers/addressController");
const verifyToken = require("../Middleware/verifyToken");

const router = express.Router();

router.get("/states", getStates);
router.get("/", verifyToken, getAddresses);
router.post("/", verifyToken, addAddress);
router.put("/:id", verifyToken, updateAddress);
router.delete("/:id", verifyToken, deleteAddress);

module.exports = router;
