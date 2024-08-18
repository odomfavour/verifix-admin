'use client';
import { useDispatch } from 'react-redux';
import {
  toggleFIRModal,
  toggleInitateQueryModal,
  toggleSuccessModal,
} from '@/provider/redux/modalSlice';

const InitiateQueryModal = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(toggleInitateQueryModal());
    dispatch(
      toggleSuccessModal({
        title: 'Query Initiated Successfully',
        subtitle: 'lordem llentesque venenatis finibus arcu,.',
        link: 'https://example.com',
      })
    );
  };
  return (
    <div className="z-50 top-0 min-h-screen bg-[#101010c8] fixed w-full flex justify-center items-center text-veriDark">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="lg:w-2/5 w-11/12 bg-white rounded-[5px] shadow-authModal p-8"
      >
        <div className="text-center mb-5">
          <p className="text-center font-bold text-[20px] mb-1">
            Initiate Interest With Vendor
          </p>
          <p className="text-sm font-[#8C94A6] leading-[22px] font-normal">
            Fill out these details to inform the business
          </p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="businessNameInput"
              className="block mb-2 text-sm font-medium"
            >
              Vendor Name
            </label>
            <input
              type="text"
              id="businessNameInput"
              placeholder="GF68920P;D"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="businessNameInput"
              className="block mb-2 text-sm font-medium"
            >
              Email Address
            </label>
            <input
              type="text"
              id="businessNameInput"
              placeholder="GF68920P;D"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="businessNameInput"
              className="block mb-2 text-sm font-medium"
            >
              Description
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Enter text here..."
            ></textarea>
            <p className="text-sm text-[#667185] mt-2">
              Keep this simple of 50 character
            </p>
          </div>
          <div>
            <label class="inline-flex justify-between  w-full items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" />
              <span class="text-sm font-medium text-[#1D2739]">
                Receive notification upon response
              </span>
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              className="py-[8px] px-[22px] border border-[#D0D5DD] text-veriGreen w-full"
              onClick={() => dispatch(toggleInitateQueryModal())}
            >
              Cancel
            </button>
            <button
              className="py-[8px] px-[22px] bg-veriGreen text-white w-full"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InitiateQueryModal;
