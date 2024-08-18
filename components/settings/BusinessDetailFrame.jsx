import React from 'react';
import { industriesOptions } from '@/utils/data';

const BusinessDetailFrame = () => {
  return (
    <section>
      <form action="">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-[24px] border border-[#EDEDF2] rounded-[12px]">
            <p className="text-lg font-bold mb-2 text-[#1A1A21]">
              Business Details
            </p>
            <p className="text-sm font-normal mb-4 text-[#8C94A6]">
              These are your personal details, they are visible to the public
            </p>

            <div className="mb-4">
              <label
                htmlFor="businessTypeSelect"
                className="block mb-2 text-sm font-medium text-[#344054]"
              >
                Business Type
              </label>
              <select
                id="businessTypeSelect"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              >
                <option value="" disabled selected>
                  Choose a business type
                </option>
                <option value="retail">Retail</option>
                <option value="wholesale">Wholesale</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="industrySelect"
                className="block mb-2 text-sm font-medium"
              >
                Industry
              </label>
              <select
                id="industrySelect"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              >
                <option value="" disabled selected>
                  Choose an industry
                </option>
                {industriesOptions.map((industry, index) => (
                  <option key={index} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="businessNameInput"
                className="block mb-2 text-sm font-medium text-[#344054]"
              >
                Business Name
              </label>
              <input
                type="text"
                id="businessNameInput"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="businessEmailInput"
                className="block mb-2 text-sm font-medium text-[#344054]"
              >
                Business Email
              </label>
              <input
                type="text"
                id="businessEmailInput"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumberInput"
                className="block mb-2 text-sm font-medium"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumberInput"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="emailAddressInput"
                className="block mb-2 text-sm font-medium text-[#344054]"
              >
                Business Address
              </label>
              <input
                type="text"
                id="businessAddressInput"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              />
            </div>
          </div>
          <div className="bg-white p-[24px] border border-[#EDEDF2] rounded-[12px]">
            <p className="text-lg font-bold mb-2 text-[#1A1A21]">
              Representative Details
            </p>
            <p className="text-sm font-normal mb-4 text-[#8C94A6]">
              Enter your current password to make update
            </p>

            <div className="mb-4">
              <label
                htmlFor="businessNameInput"
                className="block mb-2 text-sm font-medium"
              >
                Representative Name
              </label>
              <input
                type="text"
                id="businessNameInput"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="businessNameInput"
                className="block mb-2 text-sm font-medium"
              >
                Representative Phone Number
              </label>
              <input
                type="text"
                id="businessNameInput"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="businessNameInput"
                className="block mb-2 text-sm font-medium"
              >
                Business Name
              </label>
              <input
                type="text"
                id="businessNameInput"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="businessEmailInput"
                className="block mb-2 text-sm font-medium"
              >
                Business Email
              </label>
              <input
                type="text"
                id="businessEmailInput"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumberInput"
                className="block mb-2 text-sm font-medium"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumberInput"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="emailAddressInput"
                className="block mb-2 text-sm font-medium"
              >
                Business Address
              </label>
              <input
                type="text"
                id="businessAddressInput"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-5">
          <div></div>
          <div className="flex mt-5 gap-6">
            <button className="w-full py-3 border border-veriGreen text-veriGreen">
              Cancel
            </button>
            <button className="w-full py-3 bg-veriGreen text-white">
              Proceed
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default BusinessDetailFrame;
