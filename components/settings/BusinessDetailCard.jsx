import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toggleChangeBusinessNameModal } from '@/provider/redux/modalSlice';
import { industriesOptions } from '@/utils/data'; // Ensure you import this correctly
import { toast } from 'react-toastify';
import Image from 'next/image';
const BusinessDetailCard = ({ vendor, setVendor, countries }) => {
  console.log('vendor', vendor);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const activeVendor = useSelector((state) => state.user.activeVendor);

  // Initialize state for form fields with vendor prop values
  const [formData, setFormData] = useState({
    businessType: '',
    businessName: '',
    businessEmail: '',
    phoneNumber: '',
    businessCountryCode: '',
    businessAddress: '',
    description: '',
    facebook: '',
    instagram: '',
    twitter: '',
    logo: null,
    bannerImage: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vendor) {
      setFormData({
        businessType: vendor?.businessType || '',
        businessName: vendor?.businessName || '',
        businessEmail: vendor?.businessEmail || '',
        phoneNumber: vendor?.businessPhoneNumber || '',
        businessCountryCode: vendor?.businessCountryCode || '',
        businessAddress: vendor?.businessAddress || '',
        description: vendor?.description || '',
        facebook: vendor?.facebook || '',
        instagram: vendor?.instagram || '',
        twitter: vendor?.twitter || '',
        logo: vendor?.logo || null,
        bannerImage: vendor?.bannerImage || [],
      });
    }
  }, [vendor]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, logo: file });
  };

  const handleBannerImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      bannerImage: [...prevFormData.bannerImage, ...files],
    }));
  };

  const removeBannerImage = async (index, image) => {
    console.log('image', image);
    if (image?.id) {
      try {
        const response = await axios.delete(
          `${process.env.BASEURL}/vendor/banner`,
          {
            data: {
              imagesId: [image.id], // Adjust this based on your image object structure
              vendorId: activeVendor,
            },
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        console.log('Delete response:', response.data);

        // Optionally update vendors or handle the response as needed
        // setVendors(response.data.user.vendor);

        toast.success('Image deleted successfully');
      } catch (error) {
        console.error('Error deleting image:', error);
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.errors ||
          error?.message ||
          'Unknown error';
        toast.error(`Failed to delete image: ${errorMessage}`);
        if (error?.response?.data?.statusCode === 401) {
          // Handle unauthorized error (e.g., redirect to login)
          router.push('/auth/login');
        }
      } finally {
        setLoading(false);
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      bannerImage: prevFormData.bannerImage.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('vendorId', activeVendor);
      formData.bannerImage.forEach((image) => {
        formDataToSend.append('bannerImage', image);
      });
      for (const key in formData) {
        if (key !== 'businessName') {
          // Exclude businessName from formDataToSend
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await axios.put(
        `${process.env.BASEURL}/vendor?vendorId=${activeVendor}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status === 200) {
        // setVendor(response.data); // Update vendor state in the parent component
        toast.success('Business details updated successfully');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error updating business details:', error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        'Unknown error';
      toast.error(`Error: ${errorMessage}`);
      setLoading(false);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-[24px] border border-[#EDEDF2] rounded-[12px]">
            <p className="text-lg font-bold mb-2 text-[#1A1A21]">
              Business Details
            </p>
            <p className="text-sm font-normal mb-4 text-[#8C94A6]">
              These are your personal details, they are visible to the public
            </p>

            {/* Business Type */}
            <div className="mb-4">
              <label
                htmlFor="businessTypeSelect"
                className="block mb-2 text-sm font-medium text-[#344054]"
              >
                Business Type
              </label>
              <select
                id="businessTypeSelect"
                name="businessType"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                value={formData.businessType}
                onChange={(e) =>
                  setFormData({ ...formData, businessType: e.target.value })
                }
              >
                <option value="">Choose a business type</option>
                <option value="RETAIL">Retail</option>
                <option value="WHOLESALE">Wholesale</option>
              </select>
            </div>

            {/* Business Name */}
            <div className="mb-4">
              <div className="flex gap-2">
                <label
                  htmlFor="businessNameInput"
                  className="block mb-2 text-sm font-medium text-[#344054]"
                >
                  Business Name
                </label>{' '}
                <small
                  className="underline text-blue-600"
                  role="button"
                  onClick={() => dispatch(toggleChangeBusinessNameModal())}
                >
                  Change Business name
                </small>
              </div>
              <input
                type="text"
                id="businessNameInput"
                name="businessName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                value={formData.businessName}
                readOnly
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
              />
            </div>

            {/* Business Email */}
            <div className="mb-4">
              <label
                htmlFor="businessEmailInput"
                className="block mb-2 text-sm font-medium text-[#344054]"
              >
                Business Email
              </label>
              <input
                type="email"
                id="businessEmailInput"
                name="businessEmail"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                value={formData.businessEmail}
                onChange={(e) =>
                  setFormData({ ...formData, businessEmail: e.target.value })
                }
              />
            </div>

            {/* Phone Number */}
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
                    value={formData.businessCountryCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessCountryCode: e.target.value,
                      })
                    }
                    className="h-[44px] w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 p-3 pr-5"
                  >
                    <option value={null}>select code</option>
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
                  className="h-[44px] w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block  p-3"
                />
              </div>
            </div>

            {/* Business Address */}
            <div className="mb-4">
              <label
                htmlFor="businessAddressInput"
                className="block mb-2 text-sm font-medium text-[#344054]"
              >
                Business Address
              </label>
              <input
                type="text"
                id="businessAddressInput"
                name="businessAddress"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                value={formData.businessAddress}
                onChange={(e) =>
                  setFormData({ ...formData, businessAddress: e.target.value })
                }
              />
            </div>
          </div>

          <div className="bg-white p-[24px] border border-[#EDEDF2] rounded-[12px]">
            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-normal text-[#344054]"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your thoughts here..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>
              <small>Keep this simple, within 50 characters</small>
            </div>

            {/* Logo */}
            <div className="mb-4">
              <label htmlFor="logo" className="block mb-2 text-sm font-medium">
                Logo
              </label>
              <input
                type="file"
                id="logo"
                name="logo"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="h-[64px] w-[64px] rounded-full bg-gray-200 flex items-center justify-center">
                {formData.logo ? (
                  <Image
                    height={64}
                    width={64}
                    src={
                      formData?.logo.assetUrl ||
                      URL.createObjectURL(formData.logo)
                    }
                    alt="Logo Preview"
                    className="h-full w-full object-cover object-center rounded-full"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Logo</span>
                )}
              </div>
              <label
                htmlFor="logo"
                className="block mt-2 text-sm text-blue-600 underline cursor-pointer"
              >
                Add Image
              </label>
            </div>

            {/* Social Media Links */}
            <div className="mb-4">
              <label
                htmlFor="facebook"
                className="block mb-2 text-sm font-medium"
              >
                Facebook
              </label>
              <input
                type="text"
                id="facebook"
                name="facebook"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                value={formData.facebook}
                onChange={(e) =>
                  setFormData({ ...formData, facebook: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="instagram"
                className="block mb-2 text-sm font-medium"
              >
                Instagram
              </label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                value={formData.instagram}
                onChange={(e) =>
                  setFormData({ ...formData, instagram: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="twitter"
                className="block mb-2 text-sm font-medium"
              >
                Twitter
              </label>
              <input
                type="text"
                id="twitter"
                name="twitter"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                value={formData.twitter}
                onChange={(e) =>
                  setFormData({ ...formData, twitter: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="bannerImage"
                className="block mb-2 text-sm font-normal text-[#344054]"
              >
                Banner Images
              </label>
              <input
                type="file"
                id="bannerImage"
                name="bannerImage"
                accept="image/*"
                multiple
                onChange={handleBannerImagesChange}
                className="block w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
              />
              <div className="mt-2 flex gap-2">
                {formData.bannerImage.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={image.assetUrl || URL.createObjectURL(image)}
                      alt={`Banner preview ${index + 1}`}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => removeBannerImage(index, image)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-5">
          <div></div>
          <div className="flex mt-5 gap-6">
            <button
              type="button"
              className="w-full py-3 border border-veriGreen text-veriGreen"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-3 bg-veriGreen text-white flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>{' '}
                  <span>Loading</span>
                </>
              ) : (
                ' Save Changes'
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default BusinessDetailCard;
