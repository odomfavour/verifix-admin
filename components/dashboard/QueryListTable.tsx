import React, { useState } from 'react';
import { IoFilter } from 'react-icons/io5';
import SideQueryDetail from './SideQueryDetail';
import { formatDate } from '@/utils/utils';

interface QueryListTableProps {
  data: any[];
  fetchData: () => void;
}

const QueryListTable: React.FC<QueryListTableProps> = ({ data, fetchData }) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuery, setSelectedQuery] = useState(null); // State to hold the selected query
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control the sidebar

  const itemsPerPage = 20;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleViewClick = (query: any) => {
    setSelectedQuery(query);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative bg-white">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
          <input
            type="search"
            className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          />
          <button className="py-2 px-3 border border-[#D0D5DD] rounded-md flex gap-2 items-center">
            <IoFilter />
            Filter
          </button>
        </div>
        <select name="" id="">
          <option value="">Date joined</option>
        </select>
      </div>
      <table className="table-auto w-full text-primary rounded-2xl mb-5">
        <thead>
          <tr className="border-b bg-[#E9EDF4]">
            <th className="text-sm text-center pl-3 py-3 rounded">
              Customer Name
            </th>
            <th className="text-sm text-center pl-3 py-3 rounded">
              Business Name
            </th>
            <th className="text-sm text-center py-3">Transaction type</th>
            <th className="text-sm text-center py-3">Initiation Date</th>
            <th className="text-sm text-center py-3">Attachment</th>
            <th className="text-sm text-center py-3">Status</th>
            <th className="text-sm text-center py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => {
            const {
              query_id,
              query_status,
              businessName,
              query_transactionType,
              query_closeReason,
              query_createdAt,
              userFirstName,
              userLastName,
            } = item;
            return (
              <tr className="border-b" key={index}>
                <td className="py-4 pl-4">
                  {userFirstName} {userLastName}
                </td>
                <td className="py-4 pl-4">{businessName}</td>
                <td className="py-2 text-center">{query_transactionType}</td>
                <td className="py-2 text-center">
                  {formatDate(query_createdAt)}
                </td>
                <td className="py-2 text-center">
                  <button
                    className="text-[#3062C8]"
                    onClick={() => handleViewClick(item)}
                  >
                    View Document
                  </button>
                </td>
                <td className="py-2 text-center">
                  <button className="bg-[#F3F8EC] py-[2px] px-[12px] rounded-[12px] text-[#283713]">
                    {query_status}
                  </button>
                </td>
                <td className="py-2 text-center">
                  <button onClick={() => handleViewClick(item)}>View</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Sidebar component */}
      {selectedQuery && (
        <SideQueryDetail
          query={selectedQuery}
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default QueryListTable;
