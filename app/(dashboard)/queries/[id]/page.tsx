'use client';
import CustomerOverview from '@/components/dashboard/CustomerOverview';
import CustomerQueryListTable from '@/components/dashboard/CustomerQueryListTable';
import InitiatedInterestTable from '@/components/dashboard/InitiatedInterestTable';
import InterestListTable from '@/components/dashboard/InterestListTable';
import VendorOverview from '@/components/dashboard/VendorOverview';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface Interest {
  id: number;
  customerId: string;
  date: string;
  desc: string;
}

interface Query {
  id: number;
  queryId: string;
  transactionId: string;
  status: string;
  date: string;
  desc: string;
}

interface Vendor {
  id: number;
  vendorId: string;
  busName: string;
  businessType: string;
  businessEmail: string;
  businessPhoneNumber: string;
  industry: string;
  businessAddress: string;
  businessName: string;
  businessCountryCode: string;
  date: string;
  status: string;
  kycDocument: KycDocument;
}

interface KycDocument {
  cacCertificate: {
    assetUrl: string;
    id: string;
  };
  tinCertificate: {
    assetUrl: string;
    id: string;
  };
}
const SingleVendor = () => {
  const { id } = useParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'Interested Customers', 'Queries'];

  const [interests, setInterests] = useState<Interest[]>([
    {
      id: 1,
      customerId: '#8HAVFS7E',
      date: '1 Feb, 2024',
      desc: 'Hello, i will like to purchase some products from your store in large amounts',
    },
    {
      id: 2,
      customerId: '#8HAVFS7E',
      date: '1 Feb, 2024',
      desc: 'Hello, i will like to purchase some products from your store in large amounts',
    },
    {
      id: 3,
      customerId: '#8HAVFS7E',
      date: '1 Feb, 2024',
      desc: 'Hello, i will like to purchase some products from your store in large amounts',
    },
  ]);
  const [queries, setQueries] = useState<Query[]>([
    {
      id: 1,
      queryId: '#8HAVFS7E',
      transactionId: '#8HAVFS7E',
      status: 'Resolved',
      date: '1 Feb, 2024',
      desc: 'Hello, i will like to purchase some products from your store in large amounts',
    },
  ]);

  const user = useSelector((state: any) => state.user.user);
  const [vendor, setVendor] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await axios.get(
          `${process.env.BASEURL}/admin/vendor?vendorId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        console.log('res', response);
        setVendor(response.data.business); // Adjust this based on your actual API response structure
      } catch (error: any) {
        setError(error.message);
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.errors ||
          error?.message ||
          'Unknown error';
        if (error?.response.status === 401) {
          router.push('/');
        } else {
          toast.error(`${errorMessage}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [id, router, user?.token]);
  const verifyVendor = async () => {
    try {
      const response = await axios.post(
        `${process.env.BASEURL}/admin/vendor/verify`,
        { vendorId: id },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      toast.success('Vendor verified successfully');
      setVendor((prevVendor: Vendor) => ({
        ...prevVendor,
        status: 'Verified',
      }));
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        'Unknown error';
      toast.error(`${errorMessage}`);
    }
  };

  const suspendVendor = async () => {
    try {
      const response = await axios.post(
        `${process.env.BASEURL}/admin/vendor/suspend`,
        { vendorId: id },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      toast.success('Vendor suspended successfully');
      // setVendor((prevVendor: Vendor) => ({
      //   ...prevVendor,
      //   status: 'Suspended',
      // }));
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        'Unknown error';
      toast.error(`${errorMessage}`);
    }
  };
  return (
    <div>
      <div>
        <div>
          <Link href="/vendors">Back</Link>

          <div className="mb-[30px]">
            <p className="text-[#101928] font-semibold text-[28px]">
              Vendor Detail
            </p>
            <p>Build stronger relationships with customers</p>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 ${
                    activeTab === tab ? 'border-b-2 border-veriGreen' : ''
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex gap-3 items-center">
              <button>Block</button>
              <button onClick={verifyVendor}>Verify Vendor</button>
            </div>
          </div>
          <div className="mt-5">
            {activeTab == 'Overview' && <VendorOverview vendor={vendor} />}
            {activeTab == 'Interested Customers' && (
              <InterestListTable data={interests} />
            )}
            {activeTab == 'Queries' && (
              <CustomerQueryListTable data={queries} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleVendor;
