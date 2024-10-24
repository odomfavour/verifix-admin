"use client";

import { EmptyProductIcon, formatDate } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { TbDotsCircleHorizontal } from "react-icons/tb";
interface Vendor {
  id: number;
  businessName: string;
  businessEmail: string;
  status: string;
  createdAt: string;
  businessPhoneNumber: string;
  businessCountryCode: string;
}

interface VendorListTableProps {
  data: Vendor[];
}

const VendorListTable: React.FC<VendorListTableProps> = ({ data }) => {
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
        <select name="" id="">
          <option value="">Date joined</option>
          <option value="">Date joined</option>
          <option value="">Date joined</option>
          <option value="">Date joined</option>
        </select>
      </div>
      <table className="table-auto w-full text-primary rounded-2xl mb-5">
        <thead>
          <tr className="border-b bg-[#E9EDF4]">
            <th className="text-sm text-start pl-3 py-3 rounded">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
              />
            </th>
            <th className="text-sm text-center pl-3 py-3 rounded">
              Business Name
            </th>
            <th className="text-sm text-center py-3">ID</th>
            <th className="text-sm text-center py-3">Email</th>
            <th className="text-sm text-center py-3">Phone Number</th>
            <th className="text-sm text-center py-3">Date Joined</th>
            <th className="text-sm text-center py-3">Status</th>
            <th className="text-sm text-center py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.length > 0 &&
            currentItems.map((item, index) => {
              const {
                id,
                businessName,
                businessEmail,
                status,
                createdAt,
                businessPhoneNumber,
                businessCountryCode,
              } = item;
              return (
                <tr className="border-b" key={id}>
                  <td className="py-2 text-center text-[#344054]">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                  </td>
                  <td className="py-2 text-center text-[#344054]">
                    <Link href={`/vendors/${id}`} className="text-sm">
                      {businessName}
                    </Link>
                  </td>

                  <td className="py-2 text-center text-sm">{id}</td>
                  <td className="py-2 text-center text-sm">{businessEmail}</td>
                  <td className="py-2 text-center text-sm">
                    {businessCountryCode}
                    {businessPhoneNumber}
                  </td>
                  <td className="py-2 text-center text-sm">
                    {formatDate(createdAt)}
                  </td>
                  <td className="py-2 text-center">
                    <button
                      className={` ${
                        status == "SUSPENDED"
                          ? "bg-[#F9DEDC] text-[#B3261E]"
                          : "bg-[#F3F8EC] text-[#283713]"
                      } py-[2px] px-[12px] rounded-[12px]  text-sm`}
                    >
                      {status || "Active"}
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
                        No vendors found
                      </p>
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

export default VendorListTable;
