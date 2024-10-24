"use client";

import { EmptyProductIcon, formatDate } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { TbDotsCircleHorizontal } from "react-icons/tb";

// Define the shape of the data prop
interface Customer {
  id: number;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  createdAt: string;
  // Add other properties as needed
}

interface CustomerListTableProps {
  data: Customer[];
}

const CustomerListTable: React.FC<CustomerListTableProps> = ({ data }) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
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
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white py-4 rounded-md">
      <div className="flex my-3 justify-between px-3">
        <div className="w-1/2">
          <div className="flex gap-2">
            <div className="w-2/3">
              <input
                type="text"
                className="border rounded-md text-sm w-full p-2 "
                placeholder="Search here.."
              />
            </div>
            <button className="py-[8px] px-[12px] flex border border-[#D0D5DD] text-[] text-sm rounded-md">
              <IoFilter className="mr-2" /> Filter
            </button>
          </div>
        </div>
        <div className="w-1/4 flex justify-end">
          <input type="date" className="border rounded-md text-sm  p-2 " />
        </div>
      </div>
      <table className="table-auto w-full text-primary rounded-2xl mb-5">
        <thead>
          <tr className="border-b bg-[#E9EDF4] rounded-2xl">
            <th className="text-sm text-start pl-3 py-3 rounded">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
            </th>
            <th className="text-sm text-start pl-3 py-3 rounded">Name</th>
            <th className="text-sm text-center py-3">ID</th>
            <th className="text-sm text-center py-3">Email</th>
            <th className="text-sm text-center py-3">Phone Number</th>
            <th className="text-sm text-center py-3">Date Joined</th>
            <th className="text-sm text-center py-3">Status</th>
            <th className="text-sm text-center py-3 rounded-se-2xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.length > 0 &&
            currentItems?.map((item, index) => {
              const {
                id,
                firstName,
                lastName,
                email,
                phoneNumber,
                countryCode,
                createdAt,
                status,
              } = item;
              return (
                <tr className="border-b" key={id}>
                  <td className="py-4 pl-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-4 pl-4 text-sm">
                    {/* <div className="flex items-center gap-2"> */}

                    {/* <div className="h-[40px] w-[40px] rounded-full flex justify-center items-center bg-[#F3F8EC]">
                      <p className="text-[#506F27]">
                        {firstName?.charAt(0)}
                        {lastName?.charAt(0)}
                      </p>
                    </div> */}
                    <div>
                      <Link
                        href={`/customers/${id}`}
                        className="text-sm font-medium text-[#101928]"
                      >
                        {firstName} {lastName}
                      </Link>
                    </div>
                    {/* </div> */}
                  </td>

                  <td className="py-2 text-center text-[#344054] text-sm">
                    {id}
                  </td>
                  <td className="py-2 text-center text-[#344054] text-sm">
                    {email}
                  </td>
                  <td className="py-2 text-center text-[#344054] text-sm">
                    {countryCode}
                    {phoneNumber}
                  </td>

                  <td className="py-2 text-center text-sm">
                    {formatDate(createdAt)}
                  </td>
                  <td className="py-2 text-center">
                    <button className="bg-[#F3F8EC] py-[2px] px-[12px] rounded-[12px] text-[#283713] text-sm">
                      {status || "Active"}
                    </button>
                  </td>

                  <td className="py-2 text-center">
                    <div className="relative inline-block text-left">
                      <button
                        className="text-gray-700 px-4 py-2 rounded-full inline-flex items-center"
                        onClick={() => toggleDropdown(index)}
                      >
                        <TbDotsCircleHorizontal />
                      </button>

                      {openDropdownIndex === index && (
                        <div className="origin-top-right rounded-[16px] absolute right-0 -mt-2 w-[150px] py-2 px-4 shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-gray-100 z-30">
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
          {currentItems?.length === 0 && (
            <tr className="text-center text-primary bg-white">
              <td className="py-2 text-center" colSpan={7}>
                <div className="flex justify-center items-center min-h-[40vh]">
                  <div>
                    <div className="flex justify-center items-center">
                      <EmptyProductIcon />
                    </div>
                    <div className="mt-5">
                      <p className="font-medium text-[#475467]">
                        No Customers found
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
      {/* Pagination logic can be added here */}
    </div>
  );
};

export default CustomerListTable;
