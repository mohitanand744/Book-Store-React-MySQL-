import React, { useState } from "react";
import Modal from "./ModalContainer";
import { useForm } from "react-hook-form";
import ModelsHeading from "../Headings/ModelsHeading";

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
    </Modal>
  );
};

export default ProfileUpdateModal;
