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
    const firstName = user?.name.split(" ")[0];
    const lastName = user?.name.split(" ")[1];

    reset({
      firstName: firstName,
      lastName: lastName,
      phone: user?.phone,
      gender: user?.gender,
      favoriteGenres: user?.favoriteGenres?.map((genre) => genre.id) || [],
    });
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
              {...register("firstName", { required: "First name is required" })}
              placeholder="First Name"
              error={errors.firstName?.message}
            />
            <Input
              label="Last Name"
              type="text"
              {...register("lastName", { required: "Last name is required" })}
              placeholder="Last Name"
              error={errors.lastName?.message}
            />
          </div>

          <div className="grid grid-cols-1">
            <Input
              label="Phone"
              type="number"
              {...register("phone", { required: "Phone number is required" })}
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
