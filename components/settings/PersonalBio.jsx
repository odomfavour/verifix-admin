import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { PngIcon } from '@/utils/utils';
import { FaPenAlt } from 'react-icons/fa';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setUser } from '@/provider/redux/userSlice';

const PersonalBio = ({ user, countries }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    address: user?.address,
    countryCode: user?.countryCode,
    phoneNumber: user?.phoneNumber,
  });
  const [profileImage, setProfileImage] = useState(user?.image?.assetUrl || '');
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const isFormValid = Object.values(formData).every(
    (value) => value?.trim() !== ''
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
      setProfileImageFile(file);
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('countryCode', formData.countryCode);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      if (profileImageFile) {
        if (profileImageFile) {
          formDataToSend.append(
            'image',
            profileImageFile,
            profileImageFile.name,
            profileImageFile.type
          ); // Explicitly set MIME type
        }
      }

      const response = await axios.put(
        `${process.env.BASEURL}/user/`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('resp', response);
      if (response.data.message === 'operation successful') {
        toast.success(`Bio updated successfully`);
      }
      console.log('Bio updated successfully:', response);
      setLoading(false);
      // Update local storage
      const updatedUser = {
        ...user,
        ...formData,
        image: { assetUrl: profileImage || user?.image?.assetUrl },
        token: user?.token,
      };
      localStorage.setItem('verifixUser', JSON.stringify(updatedUser));

      // Update Redux state
      dispatch(setUser(updatedUser));
    } catch (error) {
      console.error('Error updating bio:', error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        'Unknown error';
      toast.error(`${errorMessage}`);
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmission}>
        <div className="mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                width={96}
                height={96}
                src={profileImage || user?.image?.assetUrl || '/image.png'}
                alt=""
                className="w-24 h-24 rounded-full object-cover"
              />
              <label
                htmlFor="profileImageInput"
                className="absolute bottom-0 right-0 bg-gray-700 text-white rounded-full p-2 cursor-pointer"
              >
                <FaPenAlt />
              </label>
              <input
                type="file"
                id="profileImageInput"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            {/* <div>
              <p className="text-xl font-semibold">Uploading Profile Image</p>
              <div className="mt-2 border border-gray-300 rounded h-2 w-full">
                <div className="h-full bg-[#FA9874] rounded w-1/2"></div>
              </div>
              <p className="text-sm text-[#98A2B3]">
                Profilepic2.PNG |{' '}
                <span className="text-[#475367]">45% Completed</span>
              </p>
            </div> */}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-normal text-[#101928]"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block mb-2 text-sm font-normal text-[#101928]"
          >
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            id="lastName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumberInput"
            className="block mb-2 text-sm font-normal text-[#344054]"
          >
            Phone Number
          </label>
          <div className="flex">
            <div className="relative">
              <select
                id="phoneCodeSelect"
                value={formData.countryCode}
                onChange={(e) =>
                  setFormData({ ...formData, countryCode: e.target.value })
                }
                className="h-[44px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 p-3 pr-5"
              >
                <option value={null}>Select code</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.countryCode}>
                    {country.shortName} ({country.countryCode})
                  </option>
                ))}
              </select>
            </div>
            <input
              type="tel"
              id="phoneNumberInput"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              className="h-[44px] w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 p-3"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-normal text-[#101928]"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>
        <div className="flex mt-5 gap-6">
          <button className="w-full py-3 border border-veriGreen text-veriGreen">
            Cancel
          </button>
          <button
            className={`w-full py-3 flex justify-center gap-3 ${
              isFormValid && !loading
                ? 'bg-veriGreen text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isFormValid || loading}
            type="submit"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>{' '}
                <span>Loading</span>
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalBio;
