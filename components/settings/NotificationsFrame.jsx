import React from 'react';

const NotificationsFrame = () => {
  return (
    <sectiion>
      <div className="flex gap-6">
        <div className="bg-white p-[24px] border border-[#EDEDF2] rounded-[12px] w-2/3">
          <p className="text-lg font-bold mb-2 text-[#1A1A21]">Notification</p>
          <p className="text-sm font-normal mb-6 text-[#475367]">
            These are your personal details, they are visible to the public
          </p>
          <form action="">
            <div className="mb-4 pb-5 border-b">
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium "
              >
                General
              </label>

              <label class="inline-flex justify-between w-full items-center cursor-pointer">
                <span class=" text-sm font-medium text-[#475367] ">
                  Get notifications from Verifix to stay up-to-date.
                </span>
                <input type="checkbox" value="" class="sr-only peer" />
                <div class="relative w-11 h-6 bg-veriGreen rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-veriGreen"></div>
              </label>
            </div>
            <div className="mb-4 pb-5 border-b">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-[#000929]"
              >
                Customer Update
              </label>
              <div class="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-veriGreen bg-veriGreen border-gray-300 rounded focus:ring-veriGreen dark:focus:ring-veriGreen focus:ring-2 "
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-[#475367]"
                >
                  When a customer checks your business profile
                </label>
              </div>
            </div>
            <div className="mb-4 pb-5 border-b">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-[#000929]"
              >
                Payments
              </label>
              <div class="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-veriGreen bg-veriGreen border-gray-300 rounded focus:ring-veriGreen dark:focus:ring-veriGreen focus:ring-2 "
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-[#475367]"
                >
                  When customer makes payment
                </label>
              </div>
              <div class="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-veriGreen bg-veriGreen border-gray-300 rounded focus:ring-veriGreen dark:focus:ring-veriGreen focus:ring-2 "
                />
                <label
                  for="default-checkbox"
                  class="ms-2 text-sm font-medium text-[#475367]"
                >
                  Notification about payment status
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium "
              >
                Email Newsletter
              </label>
              <div class="flex">
                <div class="flex items-center me-4">
                  <input
                    id="inline-radio"
                    type="radio"
                    value=""
                    name="inline-radio-group"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="inline-radio"
                    class="ms-2 text-sm font-medium text-[#475367] "
                  >
                    On
                  </label>
                </div>
                <div class="flex items-center me-4">
                  <input
                    id="inline-2-radio"
                    type="radio"
                    value=""
                    name="inline-radio-group"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="inline-2-radio"
                    class="ms-2 text-sm font-medium text-[#475367] "
                  >
                    Off
                  </label>
                </div>
              </div>
            </div>
            <div className="flex mt-5 gap-6">
              <button className="w-full py-3 border border-veriGreen text-veriGreen">
                Cancel
              </button>
              <button className="w-full py-3 bg-veriGreen text-white">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </sectiion>
  );
};

export default NotificationsFrame;
