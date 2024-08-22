import Image from 'next/image';
import React, { useState } from 'react';
import { BiX } from 'react-icons/bi';
import Modal from './Modal';
import DocumentModal from './DocumentModal';
import AdminCloseQueryForm from './AdminCloseQueryForm';

interface SidebarProps {
  query: any;
  isOpen: boolean;
  onClose: () => void;
  fetchData: () => void;
}

const SideQueryDetail: React.FC<SidebarProps> = ({
  query,
  isOpen,
  onClose,
  fetchData,
}) => {
  const [currentDocument, setCurrentDocument] = useState<string | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  const [openResolveModal, setOpenResolveModal] = useState(false);
  const handleResolveClose = () => {
    setOpenResolveModal(false);
  };
  return (
    <>
      {/* Backdrop for blur effect */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm z-50"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50`}
      >
        <div className="p-4 relative">
          <button
            className="text-gray-500 text-lg absolute top-4 right-4"
            onClick={onClose}
          >
            <BiX className="text-[30px]" />
          </button>
          <h2 className="text-xl font-bold mb-4">Query Details</h2>
          <div className="flex gap-3 py-2 mb-4">
            <div>
              {query?.image ? (
                <div className="relative h-[48px] w-[48px]">
                  <Image
                    src={query?.image?.assetUrl}
                    className="border object-cover rounded-full"
                    alt={query?.userfirstName}
                    fill
                  />
                </div>
              ) : (
                <div className="h-[48px] w-[48px] flex justify-center items-center rounded-full border border-gray-300">
                  <div className="flex">
                    {query?.userFirstName?.charAt(0)}
                    {query?.userLastName?.charAt(0)}
                  </div>
                </div>
              )}
            </div>
            <div>
              <p className="text-base italic font-medium mb-1">
                {query?.userFirstName || 'Omowunmi'}{' '}
                {query?.userLastName || 'Okubanjo'}
              </p>
              <p className="text-sm  font-normal">
                {query?.userEmail || 'omowunmi.okubanjo@verifix.com'}
              </p>
            </div>
          </div>
          <div className="h-[80vh] overflow-y-auto pr-5 pb-10">
            <div className="border border-veriGreen p-3 rounded-md">
              <p className="mb-3">Information</p>
              <div className="flex items-center justify-between">
                <p className="text-veriGreen">Customer Name:</p>
                <p>
                  {query.userFirstName} {query.userLastName}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-veriGreen">Customer Name:</p>
                <p>{query.businessName}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-veriGreen">Transaction Type:</p>
                <p>{query.query_transactionType}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-veriGreen">Status:</p>{' '}
                <p>{query.query_status}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-veriGreen">Created At:</p>{' '}
                <p>{query.query_createdAt}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-veriGreen">Close Reason:</p>{' '}
                <p>{query.query_closeReason || 'N/A'}</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-veriGreen">Description</p>{' '}
                  <p>{query.query_description || 'N/A'}</p>
                </div>
              </div>
            </div>
            <div className="border border-veriGreen p-3 rounded-md mt-3">
              <p className="mb-2 text-sm font-semibold">User Proof</p>
              <div>
                {query?.query_userProofImage?.length > 0 ? (
                  <div className="flex space-x-3">
                    {query?.query_userProofImage?.map((image: any) => (
                      <div key={image.id} className="relative group">
                        <Image
                          src={image.assetUrl}
                          alt="User Proof"
                          width={100}
                          height={100}
                          className="cursor-pointer rounded"
                          onClick={() => {
                            setOpenModal(true);
                            setCurrentDocument(image?.assetUrl);
                          }}
                        />
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded cursor-pointer"
                          onClick={() => {
                            setOpenModal(true);
                            setCurrentDocument(image?.assetUrl);
                          }}
                        >
                          <span className="text-white">View</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-500">
                    No user proof images available.
                  </p>
                )}
              </div>
            </div>
            <div className="border border-veriGreen p-3 rounded-md mt-3">
              <p className="mb-2 text-sm font-semibold">Vendor Proof</p>
              <div>
                {query?.query_vendorProofImage?.length > 0 ? (
                  <div className="flex space-x-3">
                    {query?.query_vendorProofImage?.map((image: any) => (
                      <div key={image.id} className="relative group">
                        <Image
                          src={image.assetUrl}
                          alt="User Proof"
                          width={100}
                          height={100}
                          className="cursor-pointer rounded"
                        />
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded cursor-pointer"
                          onClick={() => {
                            setOpenModal(true);
                            setCurrentDocument(image?.assetUrl);
                          }}
                        >
                          <span className="text-white">View</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-500">
                    No vendor proof images available.
                  </p>
                )}
              </div>
            </div>
            <div className="mt-5">
              <button
                onClick={() => setOpenResolveModal(true)}
                className={`rounded-md px-4 py-2 ${
                  query.query_status !== 'RESOLVED'
                    ? 'bg-veriGreen text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={query.query_status == 'RESOLVED'}
              >
                Close Query
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal title="" isOpen={openModal} onClose={handleClose} maxWidth="40%">
        <DocumentModal documentUrl={currentDocument} />
      </Modal>

      <Modal
        title=""
        isOpen={openResolveModal}
        onClose={handleResolveClose}
        maxWidth="40%"
      >
        <AdminCloseQueryForm
          queryId={query.query_id}
          fetchData={fetchData}
          handleClose={handleResolveClose}
        />
      </Modal>
    </>
  );
};

export default SideQueryDetail;
