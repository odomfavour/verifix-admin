"use client";

import { EmptyProductIcon, formatDate } from "@/utils/utils";
import Image from "next/image";
import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { TbDotsCircleHorizontal } from "react-icons/tb";
interface Interest {
  id: number;
  userFirstName: string;
  userLastName: string;
  date: string;
  desc: string;
}

interface InitiatedListTableProps {
  data: Interest[];
}

const InterestListTable: React.FC<InitiatedListTableProps> = ({ data }) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<any>(null);
  const toggleDropdown = (index: number) => {
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
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="bg-white">
      <div className="flex justify-between items-center p-4">
        <p className="font-semibold">initiated interests</p>
        <div>
          <div className="flex items-center gap-3">
            <div>
              <input
                type="search"
                className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              />
            </div>
            <button className="py-2 px-3 border border-[#D0D5DD] rounded-md flex gap-2 items-center">
              <IoFilter />
              Filter
            </button>
          </div>
        </div>
      </div>
      <table className="table-auto w-full text-primary rounded-2xl mb-5">
        <thead>
          <tr className="border-b bg-[#E9EDF4]">
            <th className="text-sm text-center pl-3 py-3 rounded">
              Customer ID
            </th>
            <th className="text-sm text-center pl-3 py-3 rounded">
              Customer Name
            </th>
            <th className="text-sm text-center py-3">
              Initiated interest Date
            </th>
            <th className="text-sm text-center py-3">Description</th>
            <th className="text-sm text-center py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.length > 0 &&
            currentItems.map((item, index) => {
              const { id, userFirstName, userLastName, desc, date } = item;
              return (
                <tr className="border-b" key={index}>
                  <td className="py-2 text-center text-[#344054]">
                    {id || "1"}
                  </td>
                  <td className="py-2 text-center text-[#344054]">
                    {userFirstName} {userLastName}
                  </td>

                  <td className="py-2 text-center">{formatDate(date)}</td>
                  <td className="py-2 text-center">{desc || "nil"}</td>

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
                          <button className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-start">
                            View Detail
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          {currentItems?.length == 0 && (
            <tr className="text-center text-primary bg-white">
              <td className="py-2 text-center" colSpan={7}>
                <div className="flex justify-center items-center  min-h-[60vh]">
                  <div>
                    <div className="flex justify-center items-center">
                      <EmptyProductIcon />
                    </div>
                    <div className="mt-5">
                      <p className="font-medium text-[#475467]">
                        No initiated interests found
                      </p>
                      {/* <p className="font-normal text-sm mt-3">
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
                      </div> */}
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

export default InterestListTable;
