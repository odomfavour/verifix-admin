'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { toggleSuccessModal } from '@/provider/redux/modalSlice';
const ResetPasswordForm = () => {
  const isSuccessModalOpen = useSelector(
    (state: any) => state.modal.successModalOpen
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const user = useSelector((state: any) => state.user.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      toggleSuccessModal({
        title: 'Password Reset Successful',
        subtitle:
          'Lorem ipsum dolor sit amet, consectetur scing elit name eget ex sed auctor.',
        link: '/',
        linkText: '',
      })
    );
    setLoading(true);
    // try {
    //   const response = await axios.put(
    //     `${process.env.BASEURL}/user/password`,
    //     {
    //       password,
    //       newPassword,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${user?.token}`,
    //       },
    //     }
    //   );
    //   if (response.data.message === 'operation successful') {
    //     toast.success('Password changed successfully');
    //   }
    //   console.log('Password changed successfully:', response);
    //   setPassword('');
    //   setNewPassword('');
    //   setLoading(false);
    // } catch (error: any) {
    //   console.error('Error changing password:', error);
    //   const errorMessage =
    //     error?.response?.data?.message ||
    //     error?.response?.data?.errors ||
    //     error?.message ||
    //     'Unknown error';
    //   toast.error(errorMessage);
    //   setLoading(false);
    // }
  };

  const isFormValid = password !== '' && newPassword !== '';

  return (
    <div className="bg-white p-7 rounded-[10px]">
      <div className="text-center">
        <p className="text-[#667185] font-normal text-base mb-[32px]">
          Reset Password
        </p>
      </div>
      {JSON.stringify(isSuccessModalOpen)}
      <form onSubmit={handlePasswordChange}>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-normal text-[#101928]"
          >
            Old Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="oldPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block mb-2 text-sm font-normal text-[#101928]"
          >
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            />
            <div
              className="absolute flex bottom-0 top-0 justify-center items-center right-3 text-primary cursor-pointer"
              onClick={() =>
                setShowNewPassword(
                  (prevShowNewPassword) => !prevShowNewPassword
                )
              }
            >
              {showNewPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </div>
        <div className="flex mt-5 gap-6">
          <button
            type="submit"
            className={`w-full py-3 flex justify-center gap-3 ${
              isFormValid && !loading
                ? 'bg-veriGreen text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isFormValid || loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Loading</span>
              </>
            ) : (
              'Update'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
