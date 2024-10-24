"use client";

import { EmptyProductIcon, formatDate } from "@/utils/utils";
import Image from "next/image";
import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { TbDotsCircleHorizontal } from "react-icons/tb";
import Modal from "./Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "@/provider/redux/modalSlice";
import AdminCloseQueryForm from "./AdminCloseQueryForm";
interface Query {
  id: number;
  query_id: number;
  query_transactionType: string;
  query_status: string;
  query_date: string;
}

// {
//     "query_id": 1,
//     "query_transactionType": "testst",
//     "query_closeReason": null,
//     "query_status": "PENDING",
//     "query_date": "2024-07-26T00:00:00.000Z",
//     "query_userProofImage": [
//         {
//             "assetUrl": "https://res.cloudinary.com/dkchqhk9m/image/upload/v1722287976/verifix/query/hjsz1prrzmue51nf3qed.png",
//             "id": "verifix/query/hjsz1prrzmue51nf3qed"
//         }
//     ],
//     "query_vendorProofImage": null,
//     "query_createdAt": "2024-07-29T21:19:37.002Z",
//     "query_updatedAt": "2024-07-29T21:19:37.002Z",
//     "query_deletedAt": null,
//     "query_userId": 4,
//     "query_closedById": null,
//     "query_vendorId": 1,
//     "userFirstName": "Ogo",
//     "userLastName": "Odom",
//     "userEmail": "ogochukwuodom5@gmail.com",
//     "userImage": null,
//     "businessId": 1,
//     "businessName": "Ogochuk's Foods",
//     "businessEmail": "ogochuks@gmail.com",
//     "businessPhoneNumber": "8161227313",
//     "businessAddress": "64 Mike street"
// }
interface InitiatedListTableProps {
  data: Query[];
  fetchData: () => void;
}

const CustomerQueryListTable: React.FC<InitiatedListTableProps> = ({
  data,
  fetchData,
}) => {
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const [openDropdownIndex, setOpenDropdownIndex] = useState<any>(null);
  const toggleDropdown = (index: number) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex(null);
    } else {
      setOpenDropdownIndex(index);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  const [reason, setReason] = useState<any>("");
  const [queryToClose, setQueryToClose] = useState(0);

  const openResolveModal = (id: number) => {
    setQueryToClose(id);
    setOpenModal(true);
  };

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center p-4">
        <p className="font-semibold">Queries: {data?.length}</p>
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
            <th className="text-sm text-start pl-3 py-3 rounded">Query ID</th>
            <th className="text-sm text-start pl-3 py-3">Transaction Type</th>
            <th className="text-sm text-start py-3">Date initiated</th>
            <th className="text-sm text-start py-3">status</th>
            <th className="text-sm text-start py-3 rounded-se-2xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.length > 0 &&
            currentItems?.map((item, index) => {
              const {
                query_id,
                query_date,
                query_status,
                query_transactionType,
              } = item;
              return (
                <tr className="border-b" key={query_id}>
                  <td className="py-2 pl-3 text-start text-[#344054]">
                    {query_id}
                  </td>
                  <td className="py-2 text-start text-[#344054]">
                    {query_transactionType}
                  </td>

                  <td className="py-2 text-start">{formatDate(query_date)}</td>
                  <td className="py-2 text-start">
                    <button className="bg-[#F3F8EC] py-[2px] px-[12px] rounded-[12px] text-[#283713] text-sm">
                      {query_status}
                    </button>
                  </td>

                  <td className="py-2 text-start">
                    <button
                      className={`rounded-md px-4 py-2 ${
                        reason
                          ? "bg-veriGreen text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      onClick={() => openResolveModal(query_id)}
                      disabled={query_status === "RESOLVED"}
                    >
                      Resolve
                    </button>
                    {/* <button
                      className="bg-veriGreen text-white p-2 rounded-md"
                      onClick={() => openResolveModal(query_id)}
                    >
                      Resolve
                    </button> */}
                    {/* <div className="relative inline-block text-left">
                  
                      <button
                        className=" text-gray-700 px-4 py-2 rounded-full inline-flex items-center"
                        onClick={() => toggleDropdown(index)}
                      >
                        <TbDotsCircleHorizontal />
                      </button>

             
                      {openDropdownIndex === index && (
                        <div className="origin-top-right rounded-[16px] absolute right-0 -mt-2 w-[150px] py-2 px-4 shadow-lg bg-white ring-1 ring-black ring-opacity-5  divide-gray-100 z-30">
                          <button className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-start">
                            View Detail
                          </button>
                        </div>
                      )}
                    </div> */}
                  </td>
                </tr>
              );
            })}
          {currentItems?.length == 0 && (
            <tr className="text-center text-primary bg-white">
              <td className="py-2 text-center" colSpan={7}>
                <div className="flex justify-center items-center  min-h-[40vh]">
                  <div>
                    <div className="flex justify-center items-center">
                      <EmptyProductIcon />
                    </div>
                    <div className="mt-5">
                      <p className="font-medium text-[#475467]">
                        No Queries found
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

      <Modal title="" isOpen={openModal} onClose={handleClose} maxWidth="30%">
        <AdminCloseQueryForm
          queryId={queryToClose}
          fetchData={fetchData}
          handleClose={handleClose}
        />
      </Modal>
    </div>
  );
};

export default CustomerQueryListTable;
