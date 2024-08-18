'use client';
import { BsXLg } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import {
  toggleChangeBusinessNameForm,
  toggleChangeBusinessNameModal,
} from '@/provider/redux/modalSlice';
import Link from 'next/link';
import { FeaturedIcon } from '@/utils/utils';

const ChangeBusinessNameModal = () => {
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
            onClick={() => dispatch(toggleChangeBusinessNameModal())}
          />
        </div>
        <div className="mb-3 flex items-center justify-center">
          <FeaturedIcon />
        </div>
        <p className="text-center font-semibold text-2xl mb-3">
          Change Business Name
        </p>
        <p className="text-[#667185] text-center leading-6 mb-5">
          CAC change of name is required for a name of change, click proceed to
          continue
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => dispatch(toggleChangeBusinessNameModal())}
            className="text-[#344054] py-[10px] px-[22px] w-full inline-block text-center border border-[#344054]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              dispatch(toggleChangeBusinessNameModal());
              dispatch(toggleChangeBusinessNameForm());
            }}
            className="bg-veriGreen py-[10px] px-[22px] w-full inline-block text-center text-white"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeBusinessNameModal;
