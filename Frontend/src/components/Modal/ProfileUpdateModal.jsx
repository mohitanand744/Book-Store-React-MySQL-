import React, { useState, useEffect } from "react";
import Modal from "./ModalContainer";
import { Controller, useForm } from "react-hook-form";
import ModelsHeading from "../Headings/ModelsHeading";
import { motion } from "framer-motion";
import Input from "../Inputs/Input";
import Button from "../Buttons/Button";
import { getAllCategories } from "../../utils/apis/categoryApis";
import { useLoader } from "../../Hooks/useLoader";
import Spinner from "../Loaders/Spinner";
import BooksLoader from "../Loaders/BooksLoader";
import { PhoneIcon, TrashIcon } from "@heroicons/react/24/outline";
import NoData from "../EmptyData/noData";
import { updateProfile } from "../../utils/apis/userApis";
import { toast } from "sonner";
import {
  firstNameValidationRules,
  lastNameValidationRules,
  phoneValidationRules,
} from "../../utils/validations/rules";
import { VALIDATION_MESSAGES } from "../../utils/validations/messages";

const ProfileUpdateModal = ({
  showProfileUpdateModal,
  setShowProfileUpdateModal,
  type = "complete",
  user,
}) => {
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
  } = useForm();
  const [categoriesList, setCategoriesList] = useState([]);
  const { loading } = useLoader();

  const handleKeyDown = (
    e,
    regex,
    fieldName,
    fieldLabel,
    message,
    maxLength,
  ) => {
    const allowedKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Enter",
      "Control",
      "Alt",
      "Shift",
      "Meta",
    ];

    if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
      return;
    }

    if (e.key.length === 1) {
      if (regex && !regex.test(e.key)) {
        e.preventDefault();
        setError(fieldName, {
          type: "manual",
          message: message || "Invalid character",
        });
        return;
      }

      if (maxLength && e.target.value.length >= maxLength) {
        e.preventDefault();
        setError(fieldName, {
          type: "manual",
          message: `Maximum ${maxLength} characters allowed for ${fieldLabel}`,
        });
        return;
      }
    }

    clearErrors(fieldName);
  };

  const handleInput = (e, regex, maxLength, fieldName, fieldLabel) => {
    let value = e.target.value;
    let filteredValue = value;

    if (regex) {
      filteredValue = value
        .split("")
        .filter((char) => regex.test(char))
        .join("");
    }

    if (maxLength && filteredValue.length > maxLength) {
      filteredValue = filteredValue.slice(0, maxLength);
      setError(fieldName, {
        type: "manual",
        message: `Maximum ${maxLength} characters allowed for ${fieldLabel}`,
      });
    } else if (value !== filteredValue) {
      setError(fieldName, {
        type: "manual",
        message: "Invalid characters were filtered",
      });
    } else {
      clearErrors(fieldName);
    }

    if (value !== filteredValue) {
      e.target.value = filteredValue;
    }
  };

  const getAllCategoriesLists = async () => {
    try {
      const response = await getAllCategories();

      if (response?.success) {
        setCategoriesList(response?.data?.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (showProfileUpdateModal) {
      getAllCategoriesLists();
    }
  }, [showProfileUpdateModal]);

  useEffect(() => {
    if (user?.name) {
      const nameParts = user.name.trim().split(/\s+/);
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      reset({
        firstName: firstName,
        lastName: lastName,
        phone: user?.phone,
        gender: user?.gender,
        favoriteGenres: user?.favoriteGenres?.map((genre) => genre.id) || [],
      });
    }
  }, [user, showProfileUpdateModal]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        gender: data.gender,
        favoriteGenres: data.favoriteGenres,
      };
      console.log("CatePaylo", payload);

      const result = await updateProfile(payload);

      if (result?.success) {
        toast.success(result?.message);
        setShowProfileUpdateModal(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <Modal
      isOpen={showProfileUpdateModal}
      onClose={() => setShowProfileUpdateModal(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="relative w-full max-w-md mx-auto"
      >
        {loading && (
          <div className="absolute top-[-2rem] right-[-1rem]">
            <BooksLoader height="0rem" imgHeight="10" imgWidth="10" />
          </div>
        )}
        <ModelsHeading
          heading={
            type === "complete"
              ? "Complete Your Profile"
              : "Update Your Profile"
          }
          subHeading={
            type === "complete"
              ? "Please complete your profile"
              : "Update your profile information"
          }
        />
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              type="text"
              {...register("firstName", firstNameValidationRules)}
              placeholder="First Name"
              error={errors.firstName?.message}
              maxLength={firstNameValidationRules.maxLength.value}
              onKeyDown={(e) =>
                handleKeyDown(
                  e,
                  /^[A-Za-z\s]$/,
                  "firstName",
                  "First Name",
                  VALIDATION_MESSAGES.OnlyLetters,
                  firstNameValidationRules.maxLength.value,
                )
              }
              onInput={(e) =>
                handleInput(
                  e,
                  /^[A-Za-z\s]$/,
                  firstNameValidationRules.maxLength.value,
                  "firstName",
                  "First Name",
                )
              }
            />
            <Input
              label="Last Name"
              type="text"
              {...register("lastName", lastNameValidationRules)}
              placeholder="Last Name"
              error={errors.lastName?.message}
              maxLength={lastNameValidationRules.maxLength.value}
              onKeyDown={(e) =>
                handleKeyDown(
                  e,
                  /^[A-Za-z\s]$/,
                  "lastName",
                  "Last Name",
                  VALIDATION_MESSAGES.OnlyLetters,
                  lastNameValidationRules.maxLength.value,
                )
              }
              onInput={(e) =>
                handleInput(
                  e,
                  /^[A-Za-z\s]$/,
                  lastNameValidationRules.maxLength.value,
                  "lastName",
                  "Last Name",
                )
              }
            />
          </div>

          <div className="grid grid-cols-1">
            <Input
              label="Phone"
              type="tel"
              {...register("phone", phoneValidationRules)}
              onChange={(e) => {
                const originalValue = e.target.value;
                const numericValue = originalValue.replace(/[^0-9]/g, "");

                if (originalValue !== numericValue) {
                  setError("phone", {
                    type: "manual",
                    message: "Only numeric characters are allowed",
                  });
                  e.target.value = numericValue;
                  return;
                }

                if (numericValue.length > 0 && !/^[6-9]/.test(numericValue)) {
                  setError("phone", {
                    type: "manual",
                    message:
                      "Indian phone numbers must start with 6, 7, 8, or 9",
                  });
                  e.target.value = "";
                  return;
                }

                if (originalValue.length > 10) {
                  setError("phone", {
                    type: "manual",
                    message: "Phone number cannot exceed 10 digits",
                  });
                  e.target.value = originalValue.slice(0, 10);
                  return;
                }

                clearErrors("phone");
              }}
              placeholder="Enter your phone number"
              error={errors.phone?.message}
              icon={<PhoneIcon className="w-5 h-5 " />}
            />
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <Input
                  label="Gender"
                  as="select"
                  options={[
                    { value: "MALE", label: "Male" },
                    { value: "FEMALE", label: "Female" },
                    { value: "OTHER", label: "Other" },
                  ]}
                  selectedValue={field.value}
                  onChange={field.onChange}
                  error={errors.gender?.message}
                  placeholder="Select Gender"
                />
              )}
            />
            <Controller
              name="favoriteGenres"
              control={control}
              rules={{ required: "Favorite Genres is required" }}
              render={({ field }) => {
                const selectedGenres =
                  categoriesList?.filter((cat) =>
                    field.value?.includes(cat.id),
                  ) || [];

                return (
                  <>
                    <Input
                      label="Favorite Genres"
                      as="select"
                      multiple={true}
                      options={categoriesList?.map((cat) => ({
                        value: cat.id,
                        label: cat.name,
                      }))}
                      selectedValue={field.value || []}
                      onChange={field.onChange}
                      error={errors.favoriteGenres?.message}
                      placeholder="Select Favorite Genres"
                    />

                    <div className="mt-3">
                      <label className="block text-sm font-medium text-[#5e4c37] mb-1">
                        Selected Favorite Genres
                      </label>

                      <div className="bg-[#FFE6C1]/30 border border-[#d4b17d] rounded-2xl">
                        {selectedGenres?.length > 0 ? (
                          <div className="grid grid-cols-2 p-3 h-[140px] overflow-y-auto gap-3">
                            {selectedGenres.map((genre) => (
                              <span
                                key={genre.id}
                                className="p-1 text-sm relative h-8 flex items-center border-b border-black/5 shadow-xl justify-center  rounded-2xl text-white bg-[#d4b17d]"
                              >
                                <span className="mr-4">{genre.name}</span>

                                <div
                                  onClick={() => {
                                    const newValue = field.value.filter(
                                      (v) => v !== genre.id,
                                    );
                                    field.onChange(newValue);
                                  }}
                                  className="absolute right-0 flex items-center justify-center w-8 h-full text-red-600 transition-all duration-200 ease-linear cursor-pointer rounded-xl bg-red-600/20 active:scale-75 hover:scale-105"
                                >
                                  <TrashIcon className="w-4 h-4" />
                                </div>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <NoData
                            icon="heart"
                            title="No favorite genres selected"
                            message="Select your favorite genres so our AI can recommend books based on your preferences."
                            iconClassName="w-8 h-8"
                            messageClassName="text-sm"
                            titleClassName="text-md"
                          />
                        )}
                      </div>
                    </div>
                  </>
                );
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowProfileUpdateModal(false)}
            >
              Back
            </Button>

            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Submit
            </Button>
          </div>
        </motion.form>
      </motion.div>
    </Modal>
  );
};

export default ProfileUpdateModal;
