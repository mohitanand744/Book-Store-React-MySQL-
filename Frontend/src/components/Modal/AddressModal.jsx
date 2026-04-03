import { Controller, set, useForm } from "react-hook-form";
import {
  MapPinIcon,
  HomeIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  PencilSquareIcon,
  TrashIcon,
  MapIcon,
  XMarkIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../Inputs/Input";
import Button from "../Buttons/Button";
import Modal from "./ModalContainer";
import Checkbox from "../Inputs/Checkbox";
import { toast } from "sonner";
import NoData from "../EmptyData/noData";
import {
  getStatesCites,
  getStatesFromDB,
  getUserAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../../utils/apis/addressApis";
import { useLoader } from "../../Hooks/useLoader";
import BooksLoader from "../Loaders/BooksLoader";
import ModelsHeading from "../Headings/ModelsHeading";
import { EyesSvg } from "../SVGs/SVGs";
import useInputHandlers from "../../Hooks/useInputHandlers";

const AddressModal = ({
  showAddress,
  setShowAddress,
  dbStates,
  setDbStates,
  setShowProfileUpdateModal,
}) => {
  const [activeTab, setActiveTab] = useState("select");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [editAddressData, setEditAddressData] = useState(null);
  const [confirmationData, setConfirmationData] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const { loading } = useLoader();
  const [viewAddressDetails, setViewAddressDetails] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    shouldFocusError: true,
  });

  const UserPinCode = watch("pinCode");
  const ViewAddressDetailsIcon = viewAddressDetails?.Icon;

  const { handleKeyDown, handleInput } = useInputHandlers(
    setError,
    clearErrors,
  );

  const fetchData = async () => {
    try {
      const addrRes = await getUserAddresses();
      if (addrRes?.success) setAddresses(addrRes.data || []);
    } catch (error) {
      toast.error("Failed to load address data");
    }
  };

  const fetchStates = async () => {
    try {
      const statesRes = await getStatesFromDB();
      if (statesRes?.success) setDbStates(statesRes.data || []);
    } catch (error) {
      toast.error("Failed to load states data");
    }
  };

  useEffect(() => {
    if (!showAddress) return;
    fetchData();
  }, [showAddress]);
  useEffect(() => {
    if (dbStates.length === 0 && activeTab === "add") {
      fetchStates();
    }
  }, [dbStates, activeTab]);

  const addressTypeIcons = {
    Home: HomeIcon,
    Work: BuildingOfficeIcon,
    Other: BuildingStorefrontIcon,
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address.id);
  };

  const handleAddNewAddress = () => {
    setActiveTab("add");
    reset({
      type: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      isDefault: false,
    });
    setSelectedAddress(null);
  };

  useEffect(() => {
    if (showAddress === "add") {
      handleAddNewAddress();
      setShowProfileUpdateModal(false);
    }
  }, [showAddress]);

  const handleBackToSelection = () => {
    reset({
      type: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      isDefault: false,
    });
    setEditAddressData(null);
    setSelectedAddress(null);
    setActiveTab("select");
  };

  const handleEditAddress = (address) => {
    console.log("successssssssssssssss");

    setActiveTab("add");
    setEditAddressData(address);

    reset({
      type: address.type,
      address: address.address,
      city: address.city,
      state: address.state,
      pinCode: address.pinCode,
      isDefault: address.isDefault,
    });
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setAddressToDelete(id);
  };

  const confirmDelete = async () => {
    if (!addressToDelete) return;
    try {
      const res = await deleteAddress(addressToDelete);
      if (res.success) {
        toast.success("Address deleted successfully!");
        if (selectedAddress === addressToDelete) {
          setSelectedAddress(null);
        }
        await fetchData();
      } else {
        toast.error(res.message || "Failed to delete address");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the address");
    } finally {
      setAddressToDelete(null);
    }
  };

  const getCitiesStatesWithPin = async (pinCode) => {
    try {
      const res = await getStatesCites(pinCode);
      const data = res[0];

      if (data?.Status === "Success") {
        const postOffice = data.PostOffice[0];

        const correctCity = postOffice.District || postOffice.Block;
        const correctState = postOffice.State;

        clearErrors(["pinCode"]);

        return { success: true, correctCity, correctState };
      } else {
        setError("pinCode", {
          type: "manual",
          message: "Invalid Pincode. Please enter a valid 6-digit Pincode.",
        });
        return false;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify pincode. Please try again.");
      setError("pinCode", {
        type: "manual",
        message: "Failed to verify pincode",
      });
      return false;
    }
  };

  const submitAddressData = async (dataToSubmit) => {
    try {
      if (editAddressData) {
        const res = await updateAddress(editAddressData.id, dataToSubmit);
        if (res.success) {
          toast.success("Address updated successfully!");

          if (showAddress?.id) {
            setShowProfileUpdateModal(true);
            setShowAddress(false);
          }
        }
      } else {
        const res = await addAddress(dataToSubmit);
        if (res.success) {
          toast.success("Address added successfully!");

          if (showAddress === "add") {
            setShowProfileUpdateModal(true);
            setShowAddress(false);
          }
        } else {
          toast.error(res.message || "Failed to add address");
        }
      }
      await fetchData();
      handleBackToSelection();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while saving the address",
      );
    }
  };

  const validateAndSubmit = async (data) => {
    if (data.pinCode?.length !== 6) {
      toast.error("Please enter a valid 6-digit Pincode.");
      return;
    }

    const res = await getCitiesStatesWithPin(data.pinCode);
    if (!res || !res.success) return;

    const enteredCity = data.city?.trim().toLowerCase();
    const enteredState = data.state?.trim().toLowerCase();
    const actualCity = res.correctCity?.trim().toLowerCase();
    const actualState = res.correctState?.trim().toLowerCase();

    if (enteredCity !== actualCity || enteredState !== actualState) {
      setConfirmationData({
        ...data,
        correctCity: res.correctCity,
        correctState: res.correctState,
      });
      return;
    }

    submitAddressData(data);
  };

  useEffect(() => {
    const fetchCityState = async () => {
      if (activeTab === "add" && UserPinCode?.length === 6) {
        const res = await getCitiesStatesWithPin(UserPinCode);
        if (res && res.success) {
          setValue("city", res.correctCity);
          setValue("state", res.correctState);
          clearErrors(["city", "state"]);
        }
      }
    };
    fetchCityState();
  }, [UserPinCode, activeTab]);

  useEffect(() => {
    if (showAddress === false) {
      setSelectedAddress(null);
    }
  }, [showAddress]);

  const handleSetDefaultAddress = async () => {
    const selected = addresses.find((addr) => addr.id === selectedAddress);

    if (!selected) return;

    if (selected.isDefault) {
      setShowAddress(false);
      return;
    }

    try {
      const updatedData = { ...selected, isDefault: true };

      const res = await updateAddress(selected.id, updatedData);

      if (res.success) {
        toast.success("Default address updated successfully!");
        await fetchData();
      } else {
        toast.error(res.message || "Failed to set default address");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error setting default address",
      );
    } finally {
      setShowAddress(false);
    }
  };

  const handleProfileUpdateEditAddress = () => {
    if (!showAddress?.id) return;

    setShowProfileUpdateModal(false);
    handleEditAddress(showAddress);
  };

  useEffect(() => {
    if (showAddress?.id) {
      handleProfileUpdateEditAddress();
    }
  }, [showAddress]);

  return (
    <Modal
      isOpen={showAddress}
      onClose={() => {
        if (showAddress === "add" || showAddress?.id) {
          setShowProfileUpdateModal(true);
          setShowAddress(false);
        }
        setShowAddress(false);
        handleBackToSelection();
      }}
      loading={loading}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="relative w-full max-w-md mx-auto"
      >
        <ModelsHeading
          heading={"Delivery Address"}
          subHeading={"Choose where you want your order delivered"}
        />

        <div className="flex mb-6 border-b border-[#5c4c49]/40">
          {["select", "add"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === "select") {
                  handleBackToSelection();
                } else if (tab === "add" && !editAddressData) {
                  handleAddNewAddress();
                }
              }}
              className="relative flex-1 py-3 font-medium text-center transition-colors duration-300"
            >
              <span
                className={
                  activeTab === tab
                    ? "text-[#5c4c49]"
                    : "text-gray-600 hover:text-[#5c4c49]"
                }
              >
                {tab === "select" ? "Saved Addresses" : "Add New"}
              </span>

              {activeTab === tab && (
                <motion.div
                  layoutId="AddressTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5c4c49]"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                ></motion.div>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "select" ? (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 "
            >
              {addresses?.length === 0 ? (
                <>
                  <NoData
                    title="No Address Found"
                    message="Please add a new address"
                    icon="search"
                    showAction={true}
                    actionText="Add New Address"
                    onActionClick={handleAddNewAddress}
                  />
                </>
              ) : (
                <div className="h-[240px] space-y-2 overflow-y-auto p-3">
                  {addresses?.map((address) => {
                    const Icon = addressTypeIcons[address.type] || HomeIcon;

                    return (
                      <div
                        key={address.id}
                        onClick={() => handleAddressSelect(address)}
                        className={`p-4  rounded-xl cursor-pointer  hover:scale-105 transition-all duration-300 ease-linear ${
                          selectedAddress === address.id
                            ? "border-[4px] border-[#fff]"
                            : "border border-[#5c4c4955]"
                        }`}
                      >
                        <div className="relative flex items-start gap-3">
                          <PencilSquareIcon
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAddress(address);
                            }}
                            className="w-5 active:scale-75 hover:scale-105 transition-all duration-200 ease-linear h-5 absolute top-0 right-0 cursor-pointer text-[#5c4c49]"
                          />
                          <div
                            onClick={() =>
                              setViewAddressDetails({ ...address, Icon })
                            }
                            className="absolute active:scale-75 hover:scale-105 transition-all duration-200 ease-linear text-[#5c4c49] top-0 w-5 h-5 right-7"
                          >
                            <EyesSvg />
                          </div>
                          <TrashIcon
                            onClick={(e) => handleDeleteClick(e, address.id)}
                            className="absolute bottom-0 right-0 w-5 h-5 text-red-600 transition-all duration-200 ease-linear cursor-pointer active:scale-75 hover:scale-105"
                          />

                          <div
                            className={`p-2 rounded-lg ${address.color} text-white`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">
                                {address.type}
                              </span>
                              {address.isDefault && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                  ● <b>Default</b>
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 [overflow-wrap:anywhere]">
                              {address.address.length < 50
                                ? address.address
                                : address.address.slice(0, 50) + "..."}
                            </p>
                            <p className="text-sm text-gray-500">
                              {address.city}, {address.state} {address.pinCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 text-sm"
                  onClick={() => {
                    setShowAddress(false);
                    if (showAddress === "add" || showAddress?.id) {
                      setShowProfileUpdateModal(true);
                      setShowAddress(false);
                    }
                    handleBackToSelection();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="flex-1 text-sm"
                  disabled={!selectedAddress}
                  onClick={handleSetDefaultAddress}
                >
                  Set as Default Address
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="add"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(validateAndSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: "Address type is required" }}
                  render={({ field }) => (
                    <Input
                      label="Address Type"
                      as="select"
                      options={[
                        { value: "Home", label: "Home" },
                        { value: "Work", label: "Work" },
                        { value: "Other", label: "Other" },
                      ]}
                      selectedValue={field.value}
                      onChange={field.onChange}
                      error={errors.type?.message}
                      placeholder="Select Address Type"
                    />
                  )}
                />
                <Input
                  label="Pin Code"
                  {...register("pinCode", {
                    required: "Pin code is required",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "PIN code must be exactly 6 digits",
                    },
                  })}
                  error={errors.pinCode?.message}
                  placeholder="Enter Pin code"
                  maxLength={6}
                  onKeyDown={(e) =>
                    handleKeyDown(
                      e,
                      /^[0-9]$/,
                      "pinCode",
                      "Pin Code",
                      "Only numbers are allowed in Pin Code",
                      6,
                    )
                  }
                  onInput={(e) =>
                    handleInput(e, /^[0-9]$/, 6, "pinCode", "Pin Code")
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="City"
                  {...register("city", {
                    required: "City is required",
                  })}
                  error={errors.city?.message}
                  placeholder="Enter City"
                  onKeyDown={(e) =>
                    handleKeyDown(
                      e,
                      /^[a-zA-Z\s]$/,
                      "city",
                      "City",
                      "Only letters and spaces are allowed in City",
                      50,
                    )
                  }
                  onInput={(e) =>
                    handleInput(e, /^[a-zA-Z\s]$/, 50, "city", "City")
                  }
                />

                <Controller
                  name="state"
                  control={control}
                  rules={{ required: "State is required" }}
                  render={({ field }) => (
                    <Input
                      label="State"
                      as="select"
                      options={dbStates.map((s) => ({
                        value: s.name,
                        label: s.name,
                      }))}
                      selectedValue={field.value}
                      onChange={field.onChange}
                      error={errors.state?.message}
                      placeholder="Select State"
                    />
                  )}
                />
              </div>

              <Controller
                name="address"
                control={control}
                rules={{
                  required: "Street address is required",
                  maxLength: {
                    value: 255,
                    message: "Street address cannot exceed 255 characters",
                  },
                  minLength: {
                    value: 5,
                    message: "Street address must be at least 5 characters",
                  },
                }}
                render={({ field }) => (
                  <Input
                    as="textarea"
                    label="Street Address"
                    icon={<MapPinIcon className="w-5 h-5" />}
                    error={errors.address?.message}
                    placeholder="Enter Street Address"
                    value={field.value}
                    onChange={field.onChange}
                    showCounter={true}
                    maxCount={255}
                    maxLength={255}
                    onKeyDown={(e) =>
                      handleKeyDown(
                        e,
                        /^[a-zA-Z0-9\s,.\-/#]$/,
                        "address",
                        "Street Address",
                        "Invalid character for Street Address",
                        255,
                      )
                    }
                    onInput={(e) => {
                      handleInput(
                        e,
                        /^[a-zA-Z0-9\s,.\-/#]$/,
                        255,
                        "address",
                        "Street Address",
                      );
                    }}
                  />
                )}
              />

              <Checkbox
                id="defaultAddress"
                label="Set as default address"
                {...register("isDefault")}
              />

              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackToSelection}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  {editAddressData ? "Update Address" : "Add Address"}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {confirmationData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 rounded-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm p-6 bg-white shadow-xl rounded-xl"
            >
              <h3 className="mb-2 text-xl font-bold text-[#5c4c49]">
                Incorrect address
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                The entered address is incorrect. Please select any of the
                suggested address.
              </p>

              <div className="p-3 mb-6 bg-gray-50 border border-[#5c4c49]/20 rounded-lg">
                <p className="text-sm text-gray-800 break-words">
                  {confirmationData.address},{" "}
                  <span className="text-red-500 line-through decoration-red-500">
                    {confirmationData.city} {confirmationData.state}
                  </span>{" "}
                  {confirmationData.correctCity},{" "}
                  {confirmationData.correctState} — {confirmationData.pinCode}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => {
                    setValue("city", confirmationData.correctCity);
                    setValue("state", confirmationData.correctState);
                    clearErrors(["city", "state"]);

                    submitAddressData({
                      ...confirmationData,
                      city: confirmationData.correctCity,
                      state: confirmationData.correctState,
                    });
                    setConfirmationData(null);
                  }}
                >
                  CONFIRM
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setConfirmationData(null)}
                >
                  CANCEL
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {addressToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 rounded-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm p-6 bg-white shadow-xl rounded-xl"
            >
              <h3 className="mb-2 text-xl font-bold text-[#5c4c49]">
                Delete Address
              </h3>

              <div className="p-3 mb-6 bg-gray-50 border border-[#5c4c49]/20 rounded-lg">
                <p className="text-sm text-gray-800">
                  Are you sure you want to delete this address? This action
                  cannot be undone.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={confirmDelete}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setAddressToDelete(null)}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewAddressDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 rounded-xl"
            onClick={() => setViewAddressDetails(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm p-6 bg-[#D3BD9D] relative shadow-xl rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-1 right-1 text-white/70 hover:text-white bg-black/10 hover:bg-white/20 rounded-xl z-[10000]"
                onClick={() => setViewAddressDetails(null)}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
              >
                <XCircleIcon className="w-7 h-7" />
              </motion.button>

              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-[#5c4c49]">
                  Address Details
                </h3>{" "}
                <div className="flex items-center">
                  {viewAddressDetails.isDefault && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-200 rounded-full ms-2">
                      <div className={``}>
                        <b>●</b>
                      </div>
                      <b>Default</b>
                    </span>
                  )}
                  <span className="inline-flex ms-2 items-center gap-1 py-1 px-2  text-xs font-medium text-green-100 bg-[#5c4c49] rounded-full">
                    <div
                      className={`rounded-lg ${viewAddressDetails.color} text-white`}
                    >
                      <ViewAddressDetailsIcon className="w-4 h-4" />
                    </div>
                    <b>{viewAddressDetails.type}</b>
                  </span>
                </div>
              </div>

              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <div className="flex gap-2 p-2 transition-all duration-200 ease-in-out border-b shadow-lg border-black/10 rounded-b-xl hover:scale-105">
                  <span className="font-medium text-[#5c4c49] min-w-[110px]">
                    Street Address:
                  </span>
                  <span className="break-words">
                    {viewAddressDetails.address}
                  </span>
                </div>

                <div className="flex gap-2 p-2 transition-all duration-200 ease-in-out border-b shadow-lg border-black/10 rounded-b-xl hover:scale-105">
                  <span className="font-medium text-[#5c4c49] min-w-[110px]">
                    City:
                  </span>
                  <span>{viewAddressDetails.city}</span>
                </div>

                <div className="flex gap-2 p-2 transition-all duration-200 ease-in-out border-b shadow-lg border-black/10 rounded-b-xl hover:scale-105">
                  <span className="font-medium text-[#5c4c49] min-w-[110px]">
                    State:
                  </span>
                  <span>{viewAddressDetails.state}</span>
                </div>

                <div className="flex gap-2 p-2 transition-all duration-200 ease-in-out border-b shadow-lg border-black/10 rounded-b-xl hover:scale-105">
                  <span className="font-medium text-[#5c4c49] min-w-[110px]">
                    PIN:
                  </span>
                  <span>{viewAddressDetails.pinCode}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default AddressModal;
