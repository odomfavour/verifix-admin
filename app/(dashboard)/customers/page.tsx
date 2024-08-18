'use client';

import CustomerListTable from '@/components/dashboard/CustomerListTable';
import { toggleLoading } from '@/provider/redux/modalSlice';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { FaDownload, FaFileDownload } from 'react-icons/fa';
import { IoFilter, IoGridOutline } from 'react-icons/io5';
import { MdOutlineFormatListBulleted } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

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

const ProductsPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [activeTab, setActiveTab] = useState('list');
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCustomers = async () => {
      dispatch(toggleLoading(true));
      try {
        const response = await axios.get(
          `${process.env.BASEURL}/admin/user/list`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        console.log('res', response);
        setCustomers(response.data.users); // Adjust this based on your actual API response structure
      } catch (error: any) {
        console.log('error', error);
        // setError(error.message);
      } finally {
        // setLoading(false);
        dispatch(toggleLoading(false));
      }
    };

    fetchCustomers();
  }, [user, dispatch]);

  return (
    <section>
      <div className="flex justify-between items-center mb-14">
        <div>
          <p className="text-[#101928] font-semibold text-[28px]">Customers</p>
          <p>Showing data of all customers registered </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border-gray-200 rounded-md  py-[8px] px-[12px] font-semibold text-sm text-[#344054] flex gap-2">
            <span>
              <FaDownload />
            </span>
            Export to CSV
          </button>
        </div>
      </div>
      <div className="mt-5">
        <CustomerListTable data={customers} />
      </div>
    </section>
  );
};

export default ProductsPage;
