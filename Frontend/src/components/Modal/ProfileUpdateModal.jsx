import React, { useState } from "react";
import Modal from "./ModalContainer";
import { useForm } from "react-hook-form";

const ProfileUpdateModal = ({
  showProfileUpdateModal,
  setShowProfileUpdateModal,
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
      <div>ProfileUpdateModal</div>
    </Modal>
  );
};

export default ProfileUpdateModal;
