const {
  fetchStates,
  fetchAddresses,
  createNewAddress,
  modifyAddress,
  removeAddress,
} = require("../Services/addressService");
const { successResponse, errorResponse } = require("../utils/response");
const handleDbError = require("../utils/handleDbError");

const getStates = async (req, res, next) => {
  try {
    const states = await fetchStates();
    successResponse(res, 200, "States fetched successfully", states);
  } catch (error) {
    handleDbError(error, res, next);
  }
};

const getAddresses = async (req, res, next) => {
  try {
    const formattedAddresses = await fetchAddresses(req.userId);
    successResponse(res, 200, "Addresses fetched successfully", formattedAddresses);
  } catch (error) {
    handleDbError(error, res, next);
  }
};

const addAddress = async (req, res, next) => {
  try {
    const data = await createNewAddress(req.userId, req.body);
    successResponse(res, 201, "Address added successfully", data);
  } catch (error) {
    handleDbError(error, res, next);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await modifyAddress(id, req.userId, req.body);

    if (result.success === false) {
      return errorResponse(res, result.statusCode || 400, result.message);
    }

    successResponse(res, 200, "Address updated successfully");
  } catch (error) {
    handleDbError(error, res, next);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeAddress(id, req.userId);

    if (result.success === false) {
      return errorResponse(res, result.statusCode || 400, result.message);
    }

    successResponse(res, 200, "Address deleted successfully");
  } catch (error) {
    handleDbError(error, res, next);
  }
};

module.exports = {
  getStates,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
};
