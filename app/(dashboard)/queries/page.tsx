'use client';
import VendorListTable from '@/components/dashboard/VendorListTable';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import QueryListTable from '@/components/dashboard/QueryListTable';
import { toggleLoading } from '@/provider/redux/modalSlice';

interface Vendor {
  id: number;
  vendorId: string;
  busName: string;
  email: string;
  date: string;
  phone: string;
  status: string;
}

const VendorsPage = () => {
  const user = useSelector((state: any) => state.user.user);
  const [queries, setQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const fetchQueries = useCallback(async () => {
    dispatch(toggleLoading(true));
    try {
      const response = await axios.get(
        `${process.env.BASEURL}/admin/query/list`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log('res', response);
      setQueries(response.data.query); // Adjust this based on your actual API response structure
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
      dispatch(toggleLoading(false));
    }
  }, [dispatch, user?.token]); //

  useEffect(() => {
    fetchQueries();
  }, [fetchQueries]);

  return (
    <section>
      <div className="flex justify-between items-center p-4">
        <div>
          <p className="text-[#101928] font-semibold text-[28px]">Queries</p>
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
      <QueryListTable data={queries} fetchData={fetchQueries} />
    </section>
  );
};

export default VendorsPage;
