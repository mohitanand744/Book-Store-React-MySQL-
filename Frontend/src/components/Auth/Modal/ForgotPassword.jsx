import { set, useForm } from "react-hook-form";
import Input from "../../Inputs/Input";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Modal from "../../Modal/Modal";
import Button from "../../Buttons/Button";
import { useState } from "react";

const ForgotPasswordModal = ({ showForgot, setShowForgot }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Now handle the result
    reset();
    console.log("Email:", data.email);
    setShowForgot(false);
    // Optionally close the modal or show a success message
  };

  return (
    <Modal isOpen={showForgot} onClose={() => setShowForgot(false)}>
      <div className="w-full">
        <h2 className="mb-1 text-2xl font-bold text-center text-[#5E4C37]">
          Forgot Password
        </h2>
        <p className="mb-4 text-sm text-center text-[#5E4C37]">
          Enter your email address to receive a reset link.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter email"
            icon={<EnvelopeIcon className="w-5 h-5 text-[#5e4c379f]" />}
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="h-[50px] "
          />

          <div className="grid grid-cols-2 gap-4">
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Reset Password
            </Button>
            <Button
              variant="outline"
              className="hover:bg-red-800"
              onClick={() => setShowForgot(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
