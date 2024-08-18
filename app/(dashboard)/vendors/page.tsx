'use client';
import VendorListTable from '@/components/dashboard/VendorListTable';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoading } from '@/provider/redux/modalSlice';
import { toast } from 'react-toastify';

interface Vendor {
  id: number;
  businessName: string;
  businessEmail: string;
  status: string;
  createdAt: string;
  businessPhoneNumber: string;
  businessCountryCode: string;
}

const VendorsPage = () => {
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    const fetchVendors = async () => {
      dispatch(toggleLoading(true));
      try {
        const response = await axios.get(
          `${process.env.BASEURL}/admin/vendor/list`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        console.log('res', response);
        setVendors(response.data.business); // Adjust this based on your actual API response structure
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.errors ||
          error?.message ||
          'Unknown error';
        toast.error(`${errorMessage}`);
      } finally {
        dispatch(toggleLoading(false));
      }
    };

    fetchVendors();
  }, [dispatch, user]);

  return (
    <section>
      <div className="flex justify-between items-center p-4">
        <div>
          <p className="text-[#101928] font-semibold text-[28px]">Vendors</p>
          <p>Showing data of all vendors registered</p>
        </div>
        <div>
          <div className="flex items-center gap-3">
            <button className="py-2 px-3 border border-[#D0D5DD] rounded-md flex gap-2 items-center">
              {/* <IoFilter /> */}
              Export CSV
            </button>
          </div>
        </div>
      </div>
      <VendorListTable data={vendors} />
    </section>
  );
};

export default VendorsPage;
