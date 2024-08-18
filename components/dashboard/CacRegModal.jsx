'use client';
import { BsXLg } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import {
  toggleCACModal,
  toggleSuccessModal,
} from '@/provider/redux/modalSlice';
import Link from 'next/link';
import { CloudIcon, FeaturedIcon } from '@/utils/utils';

const CacRegModal = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(toggleCACModal());
    dispatch(
      toggleSuccessModal({
        title: 'Cac Details Received',
        subtitle:
          'Cac verification takes 24-72 hours processing time, you will receive a unique ID number upon successful verification.',
        link: '/',
        linkText: '',
      })
    );
  };
  return (
    <div
      className="z-50 top-0 min-h-screen bg-[#101010c8] fixed w-full flex justify-center items-center text-veriDark"
      // onClick={() => dispatch(toggleSalaryModal())}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="lg:w-2/5 w-11/12 bg-white rounded-[5px] shadow-authModal p-8"
      >
        {/* <div className="flex justify-end items-center mb-3">
          <BsXLg
            className="cursor-pointer text-primary"
            role="button"
            onClick={() => dispatch(toggleCACModal())}
          />
        </div> */}

        <div className="text-center mb-5">
          <p className="text-center font-bold text-[20px] mb-1">
            Business Registration Number (CAC)
          </p>
          <p className="text-sm font-[#8C94A6] leading-[22px] font-normal">
            Already have a Verifix account?{' '}
          </p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="businessNameInput"
              className="block mb-2 text-sm font-medium"
            >
              CAC Number
            </label>
            <input
              type="text"
              id="businessNameInput"
              placeholder="081762981761"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            />
          </div>
          <div class="mb-4">
            <label for="default-input" class="block mb-2 text-sm font-medium ">
              Upload CAC image
            </label>
            <div className="border border-dotted min-h-[150px] p-6 rounded-[16px] border-veriGreen flex justify-center items-center">
              <div className="text-center w-10/12 mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-[56px] h-[56px] bg-gray-200 rounded-full flex items-center justify-center">
                    <CloudIcon />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="flex gap-2">
                    <p
                      className="font-semibold text-sm text-veriGreen"
                      role="button"
                    >
                      Click to upload
                    </p>
                    <p className="text-[#475367] font-normal">
                      or drag and drop
                    </p>
                  </div>
                </div>
                <p className="text-[#98A2B3]">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-full border-b" />
                  <p className="text-[#101928]">OR</p>
                  <div className="w-full border-b" />
                </div>
                <div className="flex items-center justify-center mt-5">
                  <button className="bg-veriGreen text-white py-2 px-4 rounded-[6px]">
                    {' '}
                    Browse Files
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className="py-[8px] px-[22px] border border-[#D0D5DD] text-veriGreen w-full"
              onClick={() => dispatch(toggleCACModal())}
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

export default CacRegModal;
