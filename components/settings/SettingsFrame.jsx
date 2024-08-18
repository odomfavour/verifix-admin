import { GoogleColoredIcon } from '@/utils/utils';
import React from 'react';

const SettingsFrame = () => {
  return (
    <section>
      <div className="flex gap-6">
        <div className="bg-white p-[24px] border border-[#EDEDF2] rounded-[12px] w-2/3">
          <p className="text-lg font-bold mb-2">Settings</p>
          <p className="text-sm font-normal mb-6 text-[#9A9EA7]">
            These are your personal details, they are visible to the public
          </p>
          <form action="">
            <div className="mb-4">
              <label
                htmlFor="businessTypeSelect"
                className="block mb-2 text-sm font-medium"
              >
                Preferred language
              </label>
              <select
                id="businessTypeSelect"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              >
                <option value="" disabled selected>
                  Select
                </option>
                <option value="retail">Retail</option>
                <option value="wholesale">Wholesale</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="businessNameInput"
                className="block mb-2 text-sm font-medium"
              >
                Time zone
              </label>
              <input
                type="text"
                id="businessNameInput"
                placeholder="(GMT+05:00) Karachi"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              />
            </div>
            <p className="text-lg font-bold mb-2">Linked Accounts</p>
            <p className="text-sm font-normal mb-6 text-[#9A9EA7]">
              We use this to let you sign in easily.
            </p>
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex gap-2 items-center">
                <GoogleColoredIcon />
                <p className="text-[#9A9EA7] mb-1">Sign in with Google</p>
              </div>
              <button className="flex items-center gap-2 text-veriGreen border border-veriGreen p-2">
                Remove
              </button>
            </div>
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div>
                <p className="text-veriDark font-semibold text-lg italic">
                  Delete Account
                </p>
                <p className="text-[#9A9EA7] mb-1">
                  Delete your account and all the data
                </p>
              </div>
              <button className="flex items-center gap-2 text-[#D80027] border-[#FCE3E3] border p-2">
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SettingsFrame;
