import React, { useState } from "react";
import Modal from "./ModalContainer";
import { Controller, useForm } from "react-hook-form";
import ModelsHeading from "../Headings/ModelsHeading";
import { motion } from "framer-motion";
import Input from "../Inputs/Input";
import Button from "../Buttons/Button";

const ProfileUpdateModal = ({
  showProfileUpdateModal,
  setShowProfileUpdateModal,
  type = "complete",
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

  return (
    <Modal
      isOpen={showProfileUpdateModal}
      onClose={() => setShowProfileUpdateModal(false)}
    >
      <ModelsHeading
        heading={
          type === "complete" ? "Complete Your Profile" : "Update Your Profile"
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
        //onSubmit={handleSubmit(validateAndSubmit)}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="First Name"
            type="text"
            {...register("firstName", { required: "First name is required" })}
            placeholder="First Name"
            error={errors.type?.message}
          />
          <Input
            label="Last Name"
            type="text"
            {...register("lastName", { required: "Last name is required" })}
            placeholder="Last Name"
            error={errors.type?.message}
          />
          <Input
            label="Phone"
            type="text"
            {...register("phone", { required: "Phone number is required" })}
            placeholder="Enter your phone number"
            error={errors.type?.message}
          />
          <Controller
            name="type"
            control={control}
            rules={{ required: "Favorite Genres type is required" }}
            render={({ field }) => (
              <Input
                label="Favorite Genres Type"
                as="select"
                options={[
                  { value: "Home", label: "Home" },
                  { value: "Work", label: "Work" },
                  { value: "Other", label: "Other" },
                ]}
                selectedValue={field.value}
                onChange={field.onChange}
                error={errors.type?.message}
                placeholder="Select Favorite Genres Type"
              />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            //onClick={handleBackToSelection}
          >
            Back
          </Button>

          <Button
            type="submit"
            variant="primary"
            //isLoading={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </motion.form>
    </Modal>
  );
};

export default ProfileUpdateModal;
