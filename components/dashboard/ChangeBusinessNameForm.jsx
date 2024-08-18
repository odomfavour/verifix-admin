'use client';
import { BsXLg } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import {
  toggleCompletedModal,
  toggleChangeBusinessNameModal,
  toggleChangeBusinessNameForm,
} from '@/provider/redux/modalSlice';
import Link from 'next/link';
import { FeaturedIcon } from '@/utils/utils';

const ChangeBusinessNameForm = () => {
  const dispatch = useDispatch();

  return (
    <div
      className="z-50 top-0 min-h-screen bg-[#101010c8] fixed w-full flex justify-center items-center text-veriDark"
      // onClick={() => dispatch(toggleSalaryModal())}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="lg:w-1/3 w-11/12 bg-white rounded-[5px] shadow-authModal p-8"
      >
        <div className="flex justify-end items-center mb-3">
          <BsXLg
            className="cursor-pointer text-primary"
            role="button"
            onClick={() => dispatch(toggleChangeBusinessNameForm())}
          />
        </div>
        <div>
          <p className="text-center font-semibold text-2xl mb-3">
            Change Business Name
          </p>
          <p className="text-[#667185] text-center leading-6 mb-5">
            Fill out these details to initate request
          </p>
        </div>
        <form action="">
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium "
            >
              Existing Business Name
            </label>
            <input
              type="text"
              id="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium "
            >
              New Business Name
            </label>
            <input
              type="text"
              id="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium "
            >
              Confirm Business Name
            </label>
            <input
              type="text"
              id="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            />
          </div>
        </form>
        <div className="flex gap-3">
          <button
            onClick={() => dispatch(toggleCompletedModal())}
            className="bg-veriGreen py-[10px] px-[22px] w-full inline-block text-center text-white"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeBusinessNameForm;
