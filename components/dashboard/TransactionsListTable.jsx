'use client';

import { EmptyProductIcon } from '@/utils/utils';
import Image from 'next/image';
import { useState } from 'react';
import { TbDotsCircleHorizontal } from 'react-icons/tb';

const TransactionsListTable = ({ data }) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const toggleDropdown = (index) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex(null);
    } else {
      setOpenDropdownIndex(index);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <table className="table-auto w-full text-primary rounded-2xl mb-5">
        <thead>
          <tr className="border-b bg-[#E9EDF4]  rounded-2xl">
            <th className="text-sm text-start pl-3 py-3 rounded-ss-2xl rounded">
              Name
            </th>
            <th className="text-sm text-center py-3">Amount</th>
            <th className="text-sm text-center py-3">Transaction Date</th>
            <th className="text-sm text-center py-3">Status</th>
            <th className="text-sm text-center py-3 rounded-se-2xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 &&
            currentItems.map((item, index) => {
              const { id, status } = item;
              return (
                <tr className="border-b" key={id}>
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-2">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                      />

                      <div className="h-[40px] w-[40px] rounded-full flex justify-center items-center bg-[#F3F8EC]">
                        <p className="text-[#506F27]">AA</p>
                      </div>
                      <div className="">
                        <p className="text-base font-medium text-[#101928]">
                          Anthonia Ajib
                        </p>
                        <p className="text-base font-normal text-[#475367]">
                          gbemiaden@email.com
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-2 text-center text-[#344054]">
                    $200,000.00
                  </td>

                  <td className="py-2 text-center">Jan 12, 2024 | 09:32AM</td>
                  <td className="py-2 text-center">
                    {/* <button
                      className={`rounded-[30px] px-2 py-1 ${
                        status === 'Approved'
                          ? 'bg-[#CDFFCD] text-[#007F00]'
                          : status === 'Declined'
                          ? 'bg-[#FFE0E0] text-[#D30000]'
                          : 'bg-[#FFE7B9] text-[#DA950F]'
                      } text-sm`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-[6px] w-[6px] rounded-full ${
                            status === 'Approved'
                              ? 'bg-[#007F00]'
                              : status === 'Declined'
                              ? 'bg-[#D30000]'
                              : 'bg-[#DA950F]'
                          }`}
                        />
                        <p
                          className={`capitalize ${
                            status === 'Approved'
                              ? 'text-[#007F00]'
                              : status === 'Declined'
                              ? 'text-[#D30000]'
                              : 'text-[#DA950F]'
                          }`}
                        >
                          {status}
                        </p>
                      </div>
                    </button> */}
                    <button className="bg-[#F3F8EC] py-[2px] px-[12px] rounded-[12px] text-[#283713]">
                      Succesful
                    </button>
                  </td>

                  <td className="py-2 text-center">
                    <div className="relative inline-block text-left">
                      {/* Dropdown button */}
                      <button
                        className=" text-gray-700 px-4 py-2 rounded-full inline-flex items-center"
                        onClick={() => toggleDropdown(index)}
                      >
                        <TbDotsCircleHorizontal />
                      </button>

                      {/* Dropdown content */}
                      {openDropdownIndex === index && (
                        <div className="origin-top-right rounded-[16px] absolute right-0 -mt-2 w-[150px] py-2 px-4 shadow-lg bg-white ring-1 ring-black ring-opacity-5  divide-gray-100 z-30">
                          <button
                            className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-start"
                            onClick={() => {
                              dispatch(displayProd(item));
                              dispatch(toggleProdViewModal());
                              toggleDropdown(index);
                            }}
                          >
                            View Detail
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          {currentItems.length == 0 && (
            <tr className="text-center text-primary bg-white">
              <td className="py-2 text-center" colSpan={7}>
                <div className="flex justify-center items-center  min-h-[60vh]">
                  <div>
                    <div className="flex justify-center items-center">
                      <EmptyProductIcon />
                    </div>
                    <div className="mt-5">
                      <p className="font-medium text-[#475467]">
                        No transaction found
                      </p>
                      <p className="font-normal text-sm mt-3">
                        Click “find vendors” button to get started in doing your
                        <br /> first transaction on the platform
                      </p>
                      <div className="flex justify-center mt-5">
                        <div className="flex gap-2">
                          <button className="py-[8px] px-[22px] border border-[#D0D5DD] text-veriGreen">
                            Learn more
                          </button>
                          <button className="py-[8px] px-[22px] bg-veriGreen text-white">
                            Find Vendors
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* {data.length > itemsPerPage && (
        <div className="pagination px-5">
          <div className="flex items-center gap-6 text-primary">
            <p
              className={`text-[#9F9F9F] text-base cursor-pointer ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary'
              }`}
              onClick={() => {
                if (currentPage !== 1) {
                  paginate(currentPage - 1);
                }
              }}
            >
              Previous page
            </p>
            {Array.from(
              { length: Math.ceil(data.length / itemsPerPage) },
              (_, i) => i + 1
            ).map((pageNumber) => (
              <div
                key={pageNumber}
                className={`h-[24px] w-[24px] rounded-full  flex justify-center items-center cursor-pointer ${
                  pageNumber == currentPage
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-400'
                }`}
                onClick={() => paginate(pageNumber)}
              >
                <p>{pageNumber}</p>
              </div>
            ))}
            <p
              className={`text-[#4C4C4C] text-base cursor-pointer ${
                currentPage === Math.ceil(data.length / itemsPerPage)
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary'
              }`}
              onClick={() => {
                if (currentPage !== Math.ceil(data.length / itemsPerPage)) {
                  paginate(currentPage + 1);
                }
              }}
            >
              Next page
            </p>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default TransactionsListTable;
