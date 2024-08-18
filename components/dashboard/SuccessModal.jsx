'use client';
import { BsXLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleCompletedModal,
  toggleFIRModal,
  toggleSuccessModal,
} from '@/provider/redux/modalSlice';
import Link from 'next/link';
import { FeaturedIcon } from '@/utils/utils';

const SuccessModal = ({}) => {
  const dispatch = useDispatch();
  const { title, subtitle, link, singleBtn } = useSelector(
    (state) => state.modal.successContent
  ); // Select success content from Redux store
  const handleFirs = () => {
    dispatch(toggleSuccessModal());
    // dispatch(toggleFIRModal());
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
            onClick={() => dispatch(toggleCompletedModal())}
          />
        </div> */}
        <div className="mb-3 flex items-center justify-center">
          <FeaturedIcon />
        </div>
        <p className="text-center font-semibold text-2xl mb-3">{title}</p>
        <p className="text-[#667185] text-center leading-6 mb-5">{subtitle}</p>
        <div className="mt-5">
          <div className="flex gap-3 items-center">
            <Link
              href={`${link}`}
              className="bg-veriGreen py-[8px] px-[22px] w-full inline-block text-sm text-center text-white"
            >
              Proceed to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
