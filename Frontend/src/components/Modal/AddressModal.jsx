import { Controller, useForm } from "react-hook-form";
import {
  PlusIcon,
  MapPinIcon,
  HomeIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../Inputs/Input";
import Button from "../Buttons/Button";
import Modal from "./ModalContainer";
import Checkbox from "../Inputs/Checkbox";
import { toast } from "sonner";

const AddressModal = ({ showAddress, setShowAddress }) => {
  const [activeTab, setActiveTab] = useState("select");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [editAddress, setEditAddress] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    const stored = localStorage.getItem("addresses");
    if (stored) {
      setAddresses(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

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
    reset();
    setSelectedAddress(null);
  };

  const handleBackToSelection = () => {
    setActiveTab("select");
    reset();
  };

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newAddress = {
      id: Date.now(),
      type: data.type,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      isDefault: data.isDefault || false,
      color: "bg-[#5c4c49]",
    };

    setAddresses((prev) => {
      let updated = [...prev];

      // If new address is default, remove default from others
      if (newAddress.isDefault) {
        updated = updated.map((addr) => ({
          ...addr,
          isDefault: false,
        }));
      }

      return [...updated, newAddress];
    });

    toast.success("Address added successfully!");

    reset();
    setActiveTab("select");
  };

  const handleEditAddress = (address) => {
    setActiveTab("add");
    setEditAddress(address);

    reset({
      type: address.type,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      isDefault: address.isDefault,
    });
  };

  return (
    <Modal isOpen={showAddress} onClose={() => setShowAddress(false)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">Delivery Address</h2>
          <p className="text-sm text-gray-600">
            Choose where you want your order delivered
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 border-b border-[#5c4c49]/40">
          {["select", "add"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
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
              {/* Empty State */}
              {addresses.length === 0 ? (
                <div className="py-10 text-center text-gray-500">
                  <MapPinIcon className="w-10 h-10 text-[#5c4c49] mx-auto mb-3 " />
                  <p className="font-semibold">No Address Found</p>
                  <p className="text-sm">Please add a new address</p>
                </div>
              ) : (
                <div className="h-[240px] space-y-2 overflow-y-auto p-3">
                  {addresses.map((address) => {
                    const Icon = addressTypeIcons[address.type] || HomeIcon;

                    return (
                      <div
                        key={address.id}
                        onClick={() => handleAddressSelect(address)}
                        className={`p-4  rounded-xl cursor-pointer  hover:scale-105 transition-all duration-300 ease-linear ${
                          selectedAddress === address.id
                            ? "border-t-[4px] border-b-[4px] border-[#fff]"
                            : " border-b border-t border-[#5c4c4955]"
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
                          <TrashIcon className="absolute bottom-0 right-0 w-5 h-5 text-red-600 transition-all duration-200 ease-linear cursor-pointer active:scale-75 hover:scale-105" />

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
                                <span className="px-2 py-1 text-xs bg-gray-200 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {address.address}
                            </p>
                            <p className="text-sm text-gray-500">
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Add New Button */}
              <button
                onClick={handleAddNewAddress}
                className="flex items-center justify-center w-full gap-2 p-3 mt-3 border-2 border-dashed rounded-xl"
              >
                <PlusIcon className="w-5 h-5" />
                Add New Address
              </button>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddress(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  disabled={!selectedAddress}
                  onClick={() => {
                    const selected = addresses.find(
                      (addr) => addr.id === selectedAddress,
                    );
                    console.log("Selected Address:", selected);
                    setShowAddress(false);
                  }}
                >
                  Use This Address
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="add"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
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
                  />
                )}
              />

              <Input
                label="Street Address"
                {...register("address", {
                  required: "Street address is required",
                })}
                error={errors.address?.message}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="City"
                  {...register("city", { required: "City is required" })}
                  error={errors.city?.message}
                />

                <Input
                  label="State"
                  {...register("state", { required: "State is required" })}
                  error={errors.state?.message}
                />
              </div>

              <Input
                label="ZIP Code"
                {...register("zipCode", {
                  required: "ZIP code is required",
                  pattern: {
                    value: /^[1-9][0-9]{5}$/,
                    message: "Invalid ZIP code format",
                  },
                })}
                error={errors.zipCode?.message}
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
                  {editAddress ? "Update Address" : "Add Address"}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </Modal>
  );
};

export default AddressModal;
