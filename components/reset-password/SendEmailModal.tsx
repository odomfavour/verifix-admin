"use client";
import { BsXLg } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toggleLoading, toggleOtpModal } from "@/provider/redux/modalSlice";
import OtpInput from "./OtpInput";
import Modal from "../dashboard/Modal";
import axios from "axios";
import { toast } from "react-toastify";

interface SendEmailModalProps {
  handleClose: () => void; // Prop to close the modal
  setOpenCheckEmail: (open: boolean) => void;
}

const SendEmailModal = ({
  handleClose,
  setOpenCheckEmail,
}: SendEmailModalProps) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("hhfd");
    // setErrors({}); // Clear previous errors

    try {
      dispatch(toggleLoading(true));
      const response = await axios.post(
        `${process.env.BASEURL}/admin/auth/forgot-password`,
        { email }
      );

      handleClose();
      setOpenCheckEmail(true);
      // Assuming the response contains a success flag or similar
      // if (response.data.success) {
      //   toast.success(response.data.message);
      //   setOpenModal(true);
      // } else {
      //   // Handle any other response cases here
      // }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        "Unknown error";
      toast.error(`${errorMessage}`);
    } finally {
      dispatch(toggleLoading(false));
    }
  };
  return (
    <>
      <div>
        <div className="text-center mb-5">
          <p className="text-center font-bold text-[20px] mb-1">
            Reset Password
          </p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            />
          </div>
          <div className="flex gap-3 mt-5">
            <button
              className="py-[8px] px-[22px] border border-[#D0D5DD] text-veriGreen w-full"
              onClick={handleClose}
              type="button"
            >
              Go back
            </button>
            <button
              className="py-[8px] px-[22px] bg-veriGreen text-white w-full"
              type="submit"
            >
              Proceed
            </button>
          </div>
        </form>
      </div>
      {/* <Modal title="" isOpen={openModal} onClose={handleClose} maxWidth="40%">
        <OtpInput />
      </Modal> */}
    </>
  );
};

export default SendEmailModal;
