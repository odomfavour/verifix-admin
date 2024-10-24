"use client";
import { toggleSendEmailModal } from "@/provider/redux/modalSlice";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { setUser } from "@/provider/redux/userSlice";
import axios from "axios";
import Modal from "./dashboard/Modal";
import SendEmailModal from "./reset-password/SendEmailModal";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setLoading(true);
    // Add your form submission logic here
    try {
      const response = await axios.post(
        `${process.env.BASEURL}/admin/auth/login`,
        formData
      );
      console.log("resp", response);
      dispatch(setUser(response?.data.user));
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "verifixAdminUser",
          JSON.stringify(response?.data.user)
        );
      }

      // Display toast after setting user data
      if (response?.status == 201) {
        toast.success(`Login successful`);
      }
      setLoading(false);
      router.push("/dashboard");
    } catch (error: any) {
      console.log("err", error);
      console.error("Error deleting image:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        "Unknown error";
      toast.error(`${errorMessage}`);
      setLoading(false);
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  const [openCheckEmail, setOpenCheckEmail] = useState(false);
  const handleCheckEmailClose = () => {
    setOpenCheckEmail(false);
  };

  return (
    <>
      <div className="bg-white p-7 rounded-[10px]">
        <div className="text-center">
          <p className="font-semibold italic text-[28px] mb-3">Admin Login</p>
          <p className="text-[#667185] font-normal text-base mb-[32px]">
            Enter your details to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-normal text-[#344054]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-normal text-[#344054]"
            >
              Enter Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              />
              <div
                className="absolute flex bottom-0 top-0 justify-center items-center right-3 text-primary cursor-pointer"
                onClick={() =>
                  setShowPassword((prevShowPassword) => !prevShowPassword)
                }
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <div className="flex justify-end mb-4">
            <button
              role="button"
              type="button"
              onClick={() => setOpenModal(true)}
            >
              Forgot Password
            </button>
          </div>
          <div className="flex mt-5 gap-6">
            <button
              className={`w-full py-3 flex justify-center gap-3 ${
                !formData.email || !formData.password
                  ? "bg-gray-300 text-veriDark cursor-not-allowed"
                  : "bg-veriGreen text-white"
              }`}
              type="submit"
              disabled={!formData.email || !formData.password}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>{" "}
                  <span className="">Loading</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
      <Modal title="" isOpen={openModal} onClose={handleClose} maxWidth="40%">
        <SendEmailModal
          handleClose={handleClose}
          setOpenCheckEmail={setOpenCheckEmail}
        />
      </Modal>

      <Modal
        title=""
        isOpen={openCheckEmail}
        onClose={handleCheckEmailClose}
        maxWidth="30%"
      >
        <div className="text-center">
          <div className="flex justify-center mb-5">
            <FaCheckCircle className="text-veriGreen text-3xl" />
          </div>
          <h3 className="text-center font-semibold mb-4">Email Sent</h3>
          <p className="text-base font-normal">
            Please check your email, a new password has been sent to you
          </p>
        </div>
      </Modal>
    </>
  );
};

export default LoginForm;
