'use client';
import SuccessModal from '@/components/dashboard/SuccessModal';
import ResetPasswordForm from '@/components/reset-password/ResetPasswordForm';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

const Page = () => {
  const successModalOpen = useSelector(
    (state: any) => state.modal.successModalOpen
  );
  return (
    <>
      <main className="flex justify-center items-center h-screen bg-slate-500">
        <div className="w-1/3">
          <div className="flex justify-center items-center mb-5">
            <Image
              src="/verifix-logo.svg"
              alt="the product logo"
              width="128"
              height="50"
            />
          </div>
          <ResetPasswordForm />
        </div>
      </main>
      {successModalOpen && <SuccessModal />}
    </>
  );
};

export default Page;
