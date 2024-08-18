'use client';
import React, { ReactNode, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
// import Sidebar from '@/components/dashboard/SideBar';
// import MainHeader from '@/components/dashboard/MainHeader';
// import CacRegModal from '@/components/dashboard/CacRegModal';
import { useSelector } from 'react-redux';
// import FirRegModal from '@/components/dashboard/FirRegModal';
// import SuccessModal from '@/components/dashboard/SuccessModal';
// import InitiateModal from '@/components/dashboard/InitiateQuery';
// import InitiateQueryModal from '@/components/dashboard/InitiateQuery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SendEmailModal from '@/components/reset-password/SendEmailModal';
import OtpInput from '@/components/reset-password/OtpInput';
import DocumentModal from '@/components/dashboard/DocumentModal';
import Loader from '@/components/Loader';
// import ChangeBusinessNameModal from '@/components/dashboard/ChangeBusinessNameModal';
// import ChangeBusinessNameForm from '@/components/dashboard/ChangeBusinessNameForm';
// import ConfirmModal from '@/components/dashboard/ConfirmModal';
// import { useRouter } from 'next/navigation';
// Import components and modals
const Sidebar = dynamic(() => import('@/components/dashboard/SideBar'), {
  ssr: false,
});
const MainHeader = dynamic(() => import('@/components/dashboard/MainHeader'), {
  ssr: false,
});

const DashboardWrapper = ({ children }) => {
  // const cacModalOpen = useSelector((state) => state.modal.cacModalOpen);
  // const firModalOpen = useSelector((state) => state.modal.firModalOpen);
  // const successModalOpen = useSelector((state) => state.modal.successModalOpen);
  // const queryModalOpen = useSelector((state) => state.modal.queryModalOpen);
  // const changeBusinessNameOpen = useSelector(
  //   (state) => state.modal.changeBusinessNameOpen
  // );
  // const changeBusinessNameFormOpen = useSelector(
  //   (state) => state.modal.changeBusinessNameFormOpen
  // );
  // const confirmModalOpen = useSelector((state) => state.modal.confirmModalOpen);
  const isLoading = useSelector((state) => state.modal.isLoading);
  const isSendEmailModalOpen = useSelector(
    (state) => state.modal.isSendEmailModalOpen
  );
  const isOtpModalOpen = useSelector((state) => state.modal.isOtpModalOpen);
  const isShowDocModalOpen = useSelector(
    (state) => state.modal.isShowDocModalOpen
  );

  return (
    <>
      <div className="flex gap-5 relative bg-[#F9FAFB]">
        <Sidebar />
        <main className="w-full h-screen overflow-y-scroll pt-4 relative bg-[#F9FAFB]">
          <div className="relative w-full">
            <MainHeader />
          </div>
          <div className=" mt-24 pr-5 min-h-[80vh] text-black">{children}</div>
        </main>
      </div>
      {/* {cacModalOpen && <CacRegModal />}
      {firModalOpen && <FirRegModal />}
      {successModalOpen && <SuccessModal />}
      {queryModalOpen && <InitiateQueryModal />}
      {changeBusinessNameOpen && <ChangeBusinessNameModal />}
      {confirmModalOpen && <ConfirmModal />}
      {changeBusinessNameFormOpen && <ChangeBusinessNameForm />} */}
      {isSendEmailModalOpen && <SendEmailModal />}
      {isOtpModalOpen && <OtpInput />}
      {isShowDocModalOpen && <DocumentModal />}
      {isLoading && <Loader />}
      {/* <SendEmailModal /> */}
      <ToastContainer />
    </>
  );
};

export default DashboardWrapper;
