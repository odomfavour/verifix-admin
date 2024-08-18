import { toggleShowDocModal } from '@/provider/redux/modalSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from './Modal';
import DocumentModal from './DocumentModal';

interface Vendor {
  id: number;
  vendorId: string;
  busName: string;
  businessType: string;
  businessEmail: string;
  businessPhoneNumber: string;
  industry: string;
  businessAddress: string;
  businessName: string;
  businessCountryCode: string;
  date: string;
  status: string;
  kycDocument: KycDocument;
}

interface KycDocument {
  cacCertificate: {
    assetUrl: string;
    id: string;
  };
  tinCertificate: {
    assetUrl: string;
    id: string;
  };
}

interface VendorListTableProps {
  vendor: Vendor;
}
const VendorOverview: React.FC<VendorListTableProps> = ({ vendor }) => {
  const {
    businessType,
    businessEmail,
    businessPhoneNumber,
    industry,
    businessAddress,
    businessName,
    businessCountryCode,
    kycDocument,
  } = vendor;
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<string | null>(null);

  // const openModal = (documentUrl: string) => {
  //   setCurrentDocument(documentUrl);
  //   setModalIsOpen(true);
  // };

  // const closeModal = () => {
  //   setCurrentDocument(null);
  //   setModalIsOpen(false);
  // };

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <section>
      <div className="grid grid-cols-2 gap-6">
        <div className="border border-[#E4E7EC] py-[11px] px-[15px] rounded-[10px] bg-white min-h-[300px]">
          <p className="mb-4 font-semibold text-lg">Business Details</p>
          <div className="flex justify-between items-center mb-[14px]">
            <p className="text-[#1D1F2C] text-sm font-medium">Business Type</p>
            <p className="text-[#1D1F2C] text-sm font-medium">{businessType}</p>
          </div>
          <div className="flex justify-between items-center mb-[14px]">
            <p className="text-[#1D1F2C] text-sm font-medium">
              Service Provider
            </p>
            <p className="text-[#1D1F2C] text-sm font-medium">
              Real estate services
            </p>
          </div>
          <div className="flex justify-between items-center mb-[14px]">
            <p className="text-[#1D1F2C] text-sm font-medium">Industry</p>
            <p className="text-[#1D1F2C] text-sm font-medium">{industry}</p>
          </div>
          <div className="flex justify-between items-center mb-[14px]">
            <p className="text-[#1D1F2C] text-sm font-medium">Business Name</p>
            <p className="text-[#1D1F2C] text-sm font-medium">{businessName}</p>
          </div>
          <div className="flex justify-between items-center mb-[14px]">
            <p className="text-[#1D1F2C] text-sm font-medium">Business Email</p>
            <p className="text-[#1D1F2C] text-sm font-medium">
              {businessEmail}
            </p>
          </div>
          <div className="flex justify-between items-center mb-[14px]">
            <p className="text-[#1D1F2C] text-sm font-medium">Phone Number</p>
            <p className="text-[#1D1F2C] text-sm font-medium">
              {businessCountryCode}
              {businessPhoneNumber}
            </p>
          </div>
          <div className="flex justify-between items-center mb-[14px]">
            <p className="text-[#1D1F2C] text-sm font-medium">
              Business Address
            </p>
            <p className="text-[#1D1F2C] text-sm font-medium">
              {businessAddress}
            </p>
          </div>
        </div>
        <div className="border border-[#E4E7EC] py-[11px] px-[15px] rounded-[10px] bg-white min-h-[300px]">
          <p className="mb-4 font-semibold text-lg">Representative Details</p>
          <div className="flex justify-between items-center mb-[14px]">
            <p className="text-[#1D1F2C] text-sm font-medium">
              Representative Name
            </p>
            <p className="text-[#1D1F2C] text-sm font-medium">Jakson Maduka</p>
          </div>
          <div className="flex justify-between items-center mb-[14px]">
            <p className="text-[#1D1F2C] text-sm font-medium">
              Representative Phone Number
            </p>
            <p className="text-[#1D1F2C] text-sm font-medium">
              +1 (232) 000-0000
            </p>
          </div>
        </div>
      </div>
      <div className="border border-[#E4E7EC] py-[11px] px-[15px] rounded-[10px] bg-white min-h-[300px] mt-5">
        <p className="mb-4 font-semibold text-lg">Documents</p>
        <div className="w-1/3">
          <div className="flex justify-between items-center mb-[14px]">
            <p className="text-[#1D1F2C] text-sm font-medium">
              National ID Card
            </p>
            <button className="py-1 px-4 bg-[#F3F8EC] rounded text-veriGreen">
              View
            </button>
          </div>
          <div className="flex justify-between items-center mb-[14px]">
            <p className="text-[#1D1F2C] text-sm font-medium">
              Employment Status
            </p>
            <button className="py-1 px-4 bg-[#F3F8EC] rounded text-veriGreen">
              View
            </button>
          </div>
          <div className="flex justify-between items-center mb-[14px]">
            <p className="text-[#1D1F2C] text-sm font-medium">
              Statement of Account
            </p>
            <button className="py-1 px-4 bg-[#F3F8EC] rounded text-veriGreen">
              View
            </button>
          </div>
          <div className="flex justify-between items-center mb-[14px]">
            <p className="text-[#1D1F2C] text-sm font-medium">
              CAC Certificate
            </p>
            <button
              className="py-1 px-4 bg-[#F3F8EC] rounded text-veriGreen"
              onClick={() => {
                setOpenModal(true);
                setCurrentDocument(kycDocument?.cacCertificate.assetUrl);
              }}
            >
              View
            </button>
          </div>
          <div className="flex justify-between items-center mb-[14px]">
            <p className="text-[#1D1F2C] text-sm font-medium">
              TIN Certificate
            </p>
            <button
              className="py-1 px-4 bg-[#F3F8EC] rounded text-veriGreen"
              onClick={() => {
                setOpenModal(true);
                setCurrentDocument(kycDocument?.tinCertificate.assetUrl);
              }}
            >
              View
            </button>
          </div>
        </div>
      </div>
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Document Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <button onClick={closeModal} className="close-modal">
          Close
        </button>
        {currentDocument && (
          <img
            src={currentDocument}
            alt="Document"
            style={{ maxWidth: '100%' }}
          />
        )}
      </Modal> */}
      <Modal title="" isOpen={openModal} onClose={handleClose} maxWidth="40%">
        <DocumentModal documentUrl={currentDocument} />
      </Modal>
    </section>
  );
};

export default VendorOverview;
