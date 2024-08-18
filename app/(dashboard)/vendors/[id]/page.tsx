'use client';
import CustomerOverview from '@/components/dashboard/CustomerOverview';
import CustomerQueryListTable from '@/components/dashboard/CustomerQueryListTable';
import InitiatedInterestTable from '@/components/dashboard/InitiatedInterestTable';
import InterestListTable from '@/components/dashboard/InterestListTable';
import Modal from '@/components/dashboard/Modal';
import VendorOverview from '@/components/dashboard/VendorOverview';
import { toggleLoading } from '@/provider/redux/modalSlice';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface Interest {
  id: number;
  userFirstName: string;
  userLastName: string;
  date: string;
  desc: string;
}

interface Query {
  id: number;
  query_id: number;
  query_transactionType: string;
  query_status: string;
  query_date: string;
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
  const dispatch = useDispatch();

  const tabs = ['Overview', 'Interested Customers', 'Queries'];

  const [interests, setInterests] = useState<Interest[]>([
    // {
    //   id: 1,
    //   customerId: '#8HAVFS7E',
    //   date: '1 Feb, 2024',
    //   desc: 'Hello, i will like to purchase some products from your store in large amounts',
    // },
    // {
    //   id: 2,
    //   customerId: '#8HAVFS7E',
    //   date: '1 Feb, 2024',
    //   desc: 'Hello, i will like to purchase some products from your store in large amounts',
    // },
    // {
    //   id: 3,
    //   customerId: '#8HAVFS7E',
    //   date: '1 Feb, 2024',
    //   desc: 'Hello, i will like to purchase some products from your store in large amounts',
    // },
  ]);
  const [queries, setQueries] = useState<Query[]>([
    // {
    //   id: 1,
    //   queryId: '#8HAVFS7E',
    //   transactionId: '#8HAVFS7E',
    //   status: 'Resolved',
    //   date: '1 Feb, 2024',
    //   desc: 'Hello, i will like to purchase some products from your store in large amounts',
    // },
  ]);

  const [reason, setReason] = useState<any>('');

  const user = useSelector((state: any) => state.user.user);
  const [vendor, setVendor] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchVendor = useCallback(async () => {
    dispatch(toggleLoading(true));
    try {
      const response = await axios.get(
        `${process.env.BASEURL}/admin/vendor?vendorId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setVendor(response.data.business);
    } catch (error: any) {
      setError(error.message);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        'Unknown error';
      if (error?.response?.status === 401) {
        router.push('/');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      // setLoading(false);
      dispatch(toggleLoading(false));
    }
  }, [dispatch, id, router, user?.token]);

  const fetchInterests = useCallback(async () => {
    dispatch(toggleLoading(true));
    try {
      const response = await axios.get(
        `${process.env.BASEURL}/admin/vendor/interest/list?vendorId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setInterests(response.data.interestedUsers);
    } catch (error: any) {
      setError(error.message);
      setError(error.message);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        'Unknown error';
      if (error?.response?.status === 401) {
        router.push('/');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      dispatch(toggleLoading(false));
      // setLoading(false);
    }
  }, [dispatch, id, router, user?.token]);

  const fetchQueries = useCallback(async () => {
    dispatch(toggleLoading(true));
    try {
      const response = await axios.get(
        `${process.env.BASEURL}/admin/vendor/query/list?vendorId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setQueries(response.data.query);
    } catch (error: any) {
      setError(error.message);
      setError(error.message);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        'Unknown error';
      if (error?.response?.status === 401) {
        router.push('/');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      dispatch(toggleLoading(false));
      // setLoading(false);
    }
  }, [dispatch, id, router, user?.token]);

  useEffect(() => {
    fetchVendor();
    fetchInterests();
    fetchQueries();
  }, [fetchVendor, fetchInterests, fetchQueries]);

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };

  const verifyVendor = async () => {
    dispatch(toggleLoading(true));
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
      console.log('res', response);
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
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  const suspendVendor = async () => {
    dispatch(toggleLoading(true));
    try {
      const response = await axios.post(
        `${process.env.BASEURL}/admin/vendor/suspend`,
        { vendorId: id, reason },
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
    } finally {
      dispatch(toggleLoading(false));
    }
  };
  const unSuspendVendor = async () => {
    console.log('first');
    try {
      dispatch(toggleLoading(true));
      const response = await axios.post(
        `${process.env.BASEURL}/admin/vendor/suspension/lift`,
        { vendorId: id, reason },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      toast.success('Vendor unsuspended successfully');
      fetchVendor();
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
    } finally {
      dispatch(toggleLoading(false));
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
          <div className="flex justify-between items-center">
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
              <button
                className="border-veriGreen text-veriGreen border py-[8px] px-4"
                onClick={() => setOpenModal(true)}
              >
                {vendor?.status === 'SUSPENDED' ? 'Unsuspend' : 'Suspend'}
              </button>
              <button
                onClick={verifyVendor}
                className="bg-veriGreen text-white py-[8px] px-4"
              >
                Verify Vendor
              </button>
            </div>
          </div>
          <div className="mt-5">
            {activeTab == 'Overview' && <VendorOverview vendor={vendor} />}
            {activeTab == 'Interested Customers' && (
              <InterestListTable data={interests} />
            )}
            {activeTab == 'Queries' && (
              <CustomerQueryListTable data={queries} fetchData={fetchQueries} />
            )}
          </div>
          <Modal
            title=""
            isOpen={openModal}
            onClose={handleClose}
            maxWidth="30%"
          >
            <div className="p-3">
              <p className="text-center font-semibold text-lg">
                {vendor?.status === 'SUSPENDED' ? 'Unsuspend' : 'Suspend'}{' '}
                {vendor.businessName}
              </p>
              <p className="text-base text-center mb-5">Are you sure?</p>

              <label htmlFor="reason" className="block text-xs mb-2">
                Reason
              </label>
              <textarea
                name="reason"
                id="reason"
                placeholder="reason"
                rows={3}
                className="border border-gray-300 rounded-md w-full p-2"
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
              <div className="flex justify-center items-centr">
                <div className="flex gap-3 my-5">
                  <button className="border border-red-400 px-4 py-2 text-red-600 rounded-md">
                    Cancel
                  </button>
                  <button
                    className={`${
                      vendor?.status === 'SUSPENDED'
                        ? 'bg-veriGreen text-white'
                        : 'bg-red-600 text-white '
                    } px-4 py-2 rounded-md`}
                    onClick={() => {
                      if (vendor?.status === 'SUSPENDED') {
                        unSuspendVendor();
                      } else {
                        suspendVendor();
                      }
                    }}
                  >
                    {vendor?.status === 'SUSPENDED' ? 'Unsuspend' : 'Suspend'}
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SingleVendor;
