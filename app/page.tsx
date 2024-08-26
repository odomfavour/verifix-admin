'use client';
import LoginForm from '@/components/LoginForm';
import Modal from '@/components/dashboard/Modal';
import OtpInput from '@/components/reset-password/OtpInput';
import SendEmailModal from '@/components/reset-password/SendEmailModal';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  const isSendEmailModalOpen = useSelector(
    (state: any) => state.modal.isSendEmailModalOpen
  );
  const isOtpModalOpen = useSelector(
    (state: any) => state.modal.isOtpModalOpen
  );

  return (
    <>
      <main className="flex justify-center items-center h-screen bg-login-pattern bg-cover">
        <div className="md:w-1/3 w-11/12">
          <div className="flex justify-center items-center mb-5">
            <Image
              src="/verifix-logo.svg"
              alt="the product logo"
              width="128"
              height="50"
            />
          </div>
          <LoginForm />
        </div>
      </main>

      {/* {isSendEmailModalOpen && <SendEmailModal />} */}
      {isOtpModalOpen && <OtpInput />}
    </>
  );
}
