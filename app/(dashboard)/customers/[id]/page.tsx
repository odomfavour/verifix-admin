'use client';
import CustomerOverview from '@/components/dashboard/CustomerOverview';
import CustomerQueryListTable from '@/components/dashboard/CustomerQueryListTable';
import InitiatedInterestTable from '@/components/dashboard/InitiatedInterestTable';
import { toggleLoading } from '@/provider/redux/modalSlice';
import { UserIcon, formatDate } from '@/utils/utils';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const SingleCustomer = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const dispatch = useDispatch();
  const { id } = useParams();
  const router = useRouter();
  const user = useSelector((state: any) => state.user.user);

  const [customer, setCustomer] = useState<any>({});
  const [interests, setInterests] = useState([]);
  const [queries, setQueries] = useState([]);

  const fetchCustomer = useCallback(async () => {
    dispatch(toggleLoading(true));
    try {
      const response = await axios.get(
        `${process.env.BASEURL}/admin/user?userId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log('this', response.data.user);
      setCustomer(response.data.user);
    } catch (error: any) {
      console.log('err', error);
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
      dispatch(toggleLoading(false));
    }
  }, [dispatch, id, router, user?.token]);

  const fetchInterests = useCallback(async () => {
    dispatch(toggleLoading(true));
    try {
      const response = await axios.get(
        `${process.env.BASEURL}/admin/user/interest/list?userId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setInterests(response.data.initiatedInterest);
    } catch (error: any) {
      console.log('error', error);
    } finally {
      dispatch(toggleLoading(false));
    }
  }, [dispatch, id, user?.token]);

  const fetchQueries = useCallback(async () => {
    dispatch(toggleLoading(true));
    try {
      const response = await axios.get(
        `${process.env.BASEURL}/admin/user/query/list?userId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setQueries(response.data.query);
    } catch (error: any) {
      console.log('error', error);
    } finally {
      dispatch(toggleLoading(false));
    }
  }, [dispatch, id, user?.token]);

  useEffect(() => {
    fetchCustomer();
    fetchInterests();
    fetchQueries();
  }, [fetchCustomer, fetchInterests, fetchQueries]);

  return (
    <div>
      <div className={`${activeTab === 'Overview' ? 'flex gap-6' : 'block'}`}>
        <div className="w-full">
          <Link href="/customers" className="mb-4 inline-block">
            Back
          </Link>

          <div className="mb-[30px]">
            <p className="text-[#101928] font-semibold text-[28px]">
              Customer Detail
            </p>
            <p>Build stronger relationships with customers</p>
          </div>
          <div className="flex gap-4">
            {['Overview', 'Initiated Interests', 'Queries'].map((tab) => (
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
          <div className="mt-5">
            {activeTab === 'Overview' && (
              <div className="w-1/2">
                <div className="bg-white p-6 h-full">
                  <div className="flex gap-3 py-2 mb-4">
                    <div>
                      {customer?.image ? (
                        <div className="relative h-[48px] w-[48px]">
                          <Image
                            src={customer?.image?.assetUrl}
                            className="border object-cover rounded-full"
                            alt={customer?.firstName}
                            fill
                          />
                        </div>
                      ) : (
                        <div className="h-[48px] w-[48px] flex justify-center items-center rounded-full border border-gray-300">
                          <div className="flex">
                            {customer?.firstName?.charAt(0)}
                            {customer?.lastName?.charAt(0)}
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-base italic font-medium mb-1">
                        {customer?.firstName || 'Omowunmi'}{' '}
                        {customer?.lastName || 'Okubanjo'}
                      </p>
                      <p className="text-sm  font-normal">
                        {customer?.email || 'omowunmi.okubanjo@verifix.com'}
                      </p>
                    </div>
                  </div>
                  <div className="border-t p-3">
                    {/* Additional customer details */}
                    <div className="mb-4">
                      <div className="flex items-center gap-4 py-3">
                        <UserIcon />
                        <div>
                          <p className="text-xs font-normal text-[#475467]">
                            Customer ID
                          </p>
                          <p className="text-sm font-normal text-[#101928]">
                            {customer?.id}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <div className="mb-4">
                      <div className="flex items-center gap-4 py-3">
                        <UserIcon />
                        <div>
                          <p className="text-xs font-normal text-[#475467]">
                            Email
                          </p>
                          <p className="text-sm font-normal text-[#101928]">
                            {customer?.phoneNumber}
                          </p>
                        </div>
                      </div>
                    </div> */}
                    <div className="mb-4">
                      <div className="flex items-center gap-4 py-3">
                        <UserIcon />
                        <div>
                          <p className="text-xs font-normal text-[#475467]">
                            Full Name
                          </p>
                          <p className="text-sm font-normal text-[#101928]">
                            {customer?.firstName} {customer?.lastName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center gap-4 py-3">
                        <UserIcon />
                        <div>
                          <p className="text-xs font-normal text-[#475467]">
                            Email
                          </p>
                          <p className="text-sm font-normal text-[#101928]">
                            {customer?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center gap-4 py-3">
                        <UserIcon />
                        <div>
                          <p className="text-xs font-normal text-[#475467]">
                            Phone Number
                          </p>
                          <p className="text-sm font-normal text-[#101928]">
                            {customer?.phoneNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center gap-4 py-3">
                        <UserIcon />
                        <div>
                          <p className="text-xs font-normal text-[#475467]">
                            Initiated Interest
                          </p>
                          <p className="text-sm font-normal text-[#101928]">
                            {interests.length}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center gap-4 py-3">
                        <UserIcon />
                        <div>
                          <p className="text-xs font-normal text-[#475467]">
                            Queries
                          </p>
                          <p className="text-sm font-normal text-[#101928]">
                            {queries.length}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center gap-4 py-3">
                        <UserIcon />
                        <div>
                          <p className="text-xs font-normal text-[#475467]">
                            Date Joined
                          </p>
                          <p className="text-sm font-normal text-[#101928]">
                            {formatDate(customer?.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Repeat similar blocks for other customer details */}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'Initiated Interests' && (
              <InitiatedInterestTable data={interests} />
            )}
            {activeTab === 'Queries' && (
              <CustomerQueryListTable data={queries} fetchData={fetchQueries} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCustomer;
