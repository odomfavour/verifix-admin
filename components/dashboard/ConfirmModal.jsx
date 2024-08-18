'use client';
import { BsXLg } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import {
  proceedOperation,
  toggleCompletedModal,
  toggleConfirmModal,
} from '@/provider/redux/modalSlice';
import Link from 'next/link';
import { FeaturedIcon } from '@/utils/utils';
import { useSelector } from 'react-redux';

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const { title, subtitle, btnText } = useSelector(
    (state) => state.modal.confirmContent
  );
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
            onClick={() => dispatch(toggleConfirmModal())}
          />
        </div>
        <div className="mb-3 flex items-center justify-center">
          <FeaturedIcon />
        </div>
        <p className="text-center font-semibold text-2xl mb-3">{title}</p>
        <p className="text-[#667185] text-center leading-6 mb-5">{subtitle}</p>
        <button
          onClick={() => dispatch(proceedOperation())}
          className="bg-veriGreen py-[10px] px-[22px] w-full inline-block text-center text-white"
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
