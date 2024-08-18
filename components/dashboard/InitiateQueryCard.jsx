'';
import React, { useState } from 'react';
import axios from 'axios';
import { MdOutlineDocumentScanner } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const InitiateQueryCard = ({ vendorId, vendor }) => {
  const user = useSelector((state) => state.user.user);
  const [formData, setFormData] = useState({
    transactionType: '',
    date: '',
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const submissionData = new FormData();
    submissionData.append('transactionType', formData.transactionType);
    submissionData.append('date', formData.date);
    submissionData.append('imageProof', formData.file);
    submissionData.append('vendorId', vendorId);

    try {
      const response = await axios.post(
        `${process.env.BASEURL}/user/query`,
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Form submitted successfully:', response.data);
      if (response.data.message === 'operation successful') {
        toast.success(`Query Initiated successfully`);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error submitting the form:', error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        'Unknown error';
      toast.error(`${errorMessage}`);
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="mb-5 font-bold">Initiate A Query</p>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <input
            type="text"
            id="businessTypeSelect"
            placeholder="Type the transaction type"
            name="transactionType"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            value={formData.transactionType}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                transactionType: e.target.value,
              }))
            }
          />
        </div>
        <div className="mb-4">
          <input
            type="date"
            id="date-input"
            name="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            value={formData.date}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                date: e.target.value,
              }))
            }
          />
        </div>
        <div className="mb-4 relative">
          <input
            type="file"
            id="file-input"
            className="absolute inset-0 opacity-0 h-full w-full cursor-pointer"
            accept="image/*"
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                file: e.target.files[0],
              }))
            }
          />
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-3">
            <MdOutlineDocumentScanner />
            <span className="mb-0 text-[#000929]">Upload Proof</span>
          </div>
        </div>

        <div className="flex mt-5 gap-6">
          <button
            type="submit"
            className={`w-full py-3 flex justify-center gap-3 ${
              !formData.transactionType ||
              !formData.date ||
              !formData.file ||
              vendor?.user?.email === user?.email
                ? 'bg-gray-300 text-veriDark cursor-not-allowed'
                : 'bg-veriGreen text-white'
            }`}
            disabled={
              !formData.transactionType ||
              !formData.date ||
              !formData.file ||
              vendor?.user?.email === user?.email
            }
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>{' '}
                <span className="">Loading</span>
              </>
            ) : (
              'Send Query'
            )}
          </button>
        </div>
      </form>
      <p className="mt-5 text-sm font-normal text-[#6C727F]">
        Kindly note: proof of payment is compulsory
      </p>
    </div>
  );
};

export default InitiateQueryCard;
