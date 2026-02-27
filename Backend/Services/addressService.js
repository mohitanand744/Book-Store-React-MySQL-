const addressModel = require("../Models/addressModel");

const fetchStates = async () => {
  const states = await addressModel.getAllStates();
  return states;
};

const fetchAddresses = async (userId) => {
  const addresses = await addressModel.getAddressesByUserId(userId);

  const formattedAddresses = addresses.map((addr) => ({
    id: addr.id,
    type: addr.address_type,
    pinCode: addr.pin_code,
    city: addr.city,
    state: addr.state,
    address: addr.street_address,
    isDefault: !!addr.is_default,
    color: "bg-[#5c4c49]",
  }));

  return formattedAddresses;
};

const createNewAddress = async (userId, data) => {
  const result = await addressModel.addAddress(userId, data);
  return { id: result.insertId };
};

const modifyAddress = async (id, userId, data) => {
  const result = await addressModel.updateAddress(id, userId, data);

  if (result.affectedRows === 0) {
    return { success: false, message: "Address not found or unauthorized", statusCode: 404 };
  }

  return { success: true };
};

const removeAddress = async (id, userId) => {
  const result = await addressModel.deleteAddress(id, userId);

  if (result.affectedRows === 0) {
    return { success: false, message: "Address not found or unauthorized", statusCode: 404 };
  }

  return { success: true };
};

module.exports = {
  fetchStates,
  fetchAddresses,
  createNewAddress,
  modifyAddress,
  removeAddress,
};
