'use client';
import { PngIcon } from '@/utils/utils';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import PersonalBio from './PersonalBio';

const ProfileFrame = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const user = useSelector((state) => state.user.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.BASEURL}/user/password`,
        {
          password,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.data.message === 'operation successful') {
        toast.success(`Password changed successfully`);
      }
      console.log('Password changed successfully:', response);
      setPassword('');
      setNewPassword('');
      setLoading(false);
    } catch (error) {
      console.error('Error changing password:', error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        'Unknown error';
      toast.error(`${errorMessage}`);
      setLoading(false);
    }
  };

  const isFormValid = password !== '' && newPassword !== '';

  const [owner, setOwner] = useState({});
  const [isBioLoading, setIsBioLoading] = useState(false);
  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.BASEURL}/user/`, {
  //         headers: {
  //           Authorization: `Bearer ${user?.token}`,
  //         },
  //       });
  //       console.log('resp', response);

  //       setOwner(response.data);
  //       setLoading(false);
  //       // toast.success(`${response?.data?.message}`);
  //     } catch (error) {
  //       console.log('err', error);

  //       const errorMessage =
  //         error?.response?.data?.message ||
  //         error?.response?.data?.errors ||
  //         error?.message ||
  //         'Unknown error';
  //       toast.error(`${errorMessage}`);
  //       setLoading(false);
  //     }
  //   };
  //   getUser();
  // }, [user]);

  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.BASEURL}/countries`);
        setCountries(response.data.countries);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-[24px] border border-[#EDEDF2] rounded-[12px]">
          <p className="text-lg font-bold mb-2">Profile Settings</p>
          <p className="text-sm font-normal text-[#667185] mb-6">
            These are your personal details, they are visible to the public
          </p>
          <section>
            <PersonalBio user={user} countries={countries} />
          </section>
        </div>
        <div className="bg-white p-[24px] border border-[#EDEDF2] rounded-[12px]">
          <p className="text-lg font-bold mb-2">Update Password</p>
          <p className="text-sm font-normal mb-6 text-[#667185]">
            Enter your password to make update
          </p>
          <form onSubmit={handlePasswordChange}>
            <div className="mb-4">
              <label
                htmlFor="oldPassword"
                className="block mb-2 text-sm font-normal text-[#101928]"
              >
                Old Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                />
                <div
                  className="absolute  flex bottom-0 top-0 justify-center items-center right-3 text-primary cursor-pointer"
                  onClick={() =>
                    setShowPassword((prevShowPassword) => !prevShowPassword)
                  }
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
              {/* <input
                type="password"
                id="oldPassword"
                placeholder="Enter your Password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /> */}
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
                  id="password"
                  name="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                />
                <div
                  className="absolute  flex bottom-0 top-0 justify-center items-center right-3 text-primary cursor-pointer"
                  onClick={() =>
                    setShowNewPassword((prevShowPassword) => !prevShowPassword)
                  }
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>
            <div className="flex mt-5 gap-6">
              {/* <button
                type="button"
                className="w-full py-3 border border-veriGreen text-veriGreen"
              >
                Cancel
              </button> */}
              <div className="w-1/2"></div>
              <button
                type="submit"
                className={`w-full py-3 flex justify-center gap-3  ${
                  isFormValid && !loading
                    ? 'bg-veriGreen text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isFormValid || loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>{' '}
                    <span className="">Loading</span>
                  </>
                ) : (
                  'Update'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfileFrame;
