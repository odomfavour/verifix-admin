'use client';
import VendorListTable from '@/components/dashboard/VendorListTable';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(
          `${process.env.BASEURL}/admin/vendor/list?limit=1&offset=3`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        console.log('res', response);
        setVendors(response.data.business); // Adjust this based on your actual API response structure
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [user?.token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
