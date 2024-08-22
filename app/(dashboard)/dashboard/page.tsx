'use client';
import dynamic from 'next/dynamic';
import { ShowCardIcon } from '@/utils/utils';
import React, { useCallback, useEffect, useState } from 'react';
import { toggleLoading } from '@/provider/redux/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const BarChart = dynamic(() => import('@/components/dashboard/BarChart'), {
  ssr: false,
});
const BarChartComponent = dynamic(
  () => import('@/components/dashboard/BarchartComponent'),
  { ssr: false }
);
const PieChart = dynamic(() => import('@/components/dashboard/PieChart'), {
  ssr: false,
});

interface ShowCard {
  id: number;
  name: string;
  count: number;
}

const Page: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const router = useRouter();
  const [showCards, setShowCard] = useState<ShowCard[]>([
    { id: 1, name: 'Products', count: 0 },
    { id: 2, name: 'Queries', count: 0 },
    { id: 3, name: 'Vendors', count: 0 },
    { id: 4, name: 'Customers', count: 0 },
  ]);

  const pieSeries = [44, 55, 13]; // example data
  const pieLabels = ['Active', 'Inactive', 'Suspended'];
  const pieColors = ['#C2DCA0', '#78A73B', '#506F27'];

  const lineData = [
    { date: '2024-01-01', inProgress: 44, completed: 76, pending: 35 },
    { date: '2024-02-01', inProgress: 55, completed: 85, pending: 41 },
    { date: '2024-03-01', inProgress: 57, completed: 101, pending: 36 },
    { date: '2024-04-01', inProgress: 56, completed: 98, pending: 26 },
    { date: '2024-05-01', inProgress: 61, completed: 87, pending: 45 },
    { date: '2024-06-01', inProgress: 58, completed: 105, pending: 48 },
    { date: '2024-07-01', inProgress: 63, completed: 91, pending: 52 },
    { date: '2024-08-01', inProgress: 60, completed: 114, pending: 53 },
    { date: '2024-09-01', inProgress: 66, completed: 94, pending: 41 },
    { date: '2024-10-01', inProgress: 61, completed: 104, pending: 50 },
    { date: '2024-11-01', inProgress: 70, completed: 95, pending: 47 },
    { date: '2024-12-01', inProgress: 73, completed: 109, pending: 49 },
  ];

  const barData = [
    { date: '2024-01-01', value: 10 },
    { date: '2024-02-01', value: 15 },
    { date: '2024-03-01', value: 12 },
    { date: '2024-04-01', value: 20 },
    { date: '2024-05-01', value: 25 },
    { date: '2024-06-01', value: 30 },
    { date: '2024-07-01', value: 35 },
    { date: '2024-08-01', value: 40 },
    { date: '2024-09-01', value: 45 },
    { date: '2024-10-01', value: 50 },
    { date: '2024-11-01', value: 55 },
    { date: '2024-12-01', value: 60 },
  ];
  const [queriesMetrics, setQueriesMetrics] = useState<any>();
  const [productMetrics, setProductMetrics] = useState<any>();
  const [vendorsMetrics, setVendorsMetrics] = useState<any>();
  const fetchProductMetrics = useCallback(async () => {
    dispatch(toggleLoading(true));
    try {
      const response = await axios.get(
        `${process.env.BASEURL}/admin/product/metrics`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log('resp', response);

      const transformedData = response?.data?.metrics.flatMap((yearData: any) =>
        yearData.data.map((monthData: any) => ({
          date: `${yearData.year}-${monthData.month}`,
          value: monthData.count,
        }))
      );
      setProductMetrics(transformedData);
      setShowCard((prevShowCards) =>
        prevShowCards?.map((card) =>
          card.id === 1
            ? { ...card, count: response?.data?.metrics?.total || 0 }
            : card
        )
      );
      // setCustomer(response.data.user);
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
  }, [dispatch, router, user]);

  const fetchCustomerMetrics = useCallback(async () => {
    dispatch(toggleLoading(true));
    try {
      const response = await axios.get(
        `${process.env.BASEURL}/admin/user/metrics`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log('resp customer', response);
      // setShowCard(response?.data?.metrics);
      setShowCard((prevShowCards) =>
        prevShowCards?.map((card) =>
          card.id === 4
            ? { ...card, count: response?.data?.metrics?.total }
            : card
        )
      );

      // setInterests(response.data.initiatedInterest);
    } catch (error: any) {
      console.log('error', error);
    } finally {
      dispatch(toggleLoading(false));
    }
  }, [dispatch, user]);

  const fetchQueriesMetrics = useCallback(async () => {
    dispatch(toggleLoading(true));
    try {
      const response = await axios.get(
        `${process.env.BASEURL}/admin/query/metrics`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log('resp', response?.data?.metrics.queryMetrics);
      setQueriesMetrics(response?.data?.metrics.queryMetrics);
      setShowCard((prevShowCards) =>
        prevShowCards?.map((card) =>
          card.id === 2
            ? { ...card, count: response?.data?.metrics?.total }
            : card
        )
      );
      // setQueries(response.data.query);
    } catch (error: any) {
      console.log('error', error);
    } finally {
      dispatch(toggleLoading(false));
    }
  }, [dispatch, user]);

  const fetchVendorsMetrics = useCallback(async () => {
    dispatch(toggleLoading(true));
    try {
      const response = await axios.get(
        `${process.env.BASEURL}/admin/vendor/metrics`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log('resp', response);
      // setQueries(response.data.query);
      setVendorsMetrics(response?.data?.metrics);
      setShowCard((prevShowCards) =>
        prevShowCards?.map((card) =>
          card.id === 3
            ? { ...card, count: response?.data?.metrics?.total }
            : card
        )
      );
    } catch (error: any) {
      console.log('error', error);
    } finally {
      dispatch(toggleLoading(false));
    }
  }, [dispatch, user]);

  useEffect(() => {
    fetchProductMetrics();
    fetchCustomerMetrics();
    fetchQueriesMetrics();
    fetchVendorsMetrics();
  }, [
    fetchCustomerMetrics,
    fetchProductMetrics,
    fetchQueriesMetrics,
    fetchVendorsMetrics,
  ]);

  return (
    <section>
      <div className="bg-white p-4 rounded-[10px] border border-[#E4E7EC]">
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-5">
          {showCards.map((showCard) => {
            const { id, name, count } = showCard;
            return (
              <div className="rounded bg-[#F9FAFB] p-4" key={id}>
                <ShowCardIcon />
                <div className="mt-5">
                  <p className="text-lg font-semibold text-[#1D2739] mb-1">
                    {name}
                  </p>
                  <p className="mt-2 text-base text-[#667185]">{count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-6 mt-6">
        <div className="w-2/3">
          <div className="bg-white p-7">
            <BarChart data={productMetrics || []} title="Product Report" />
          </div>
          <div className="mb-6 bg-white p-7 ">
            <BarChartComponent data={queriesMetrics || []} title="Queries" />
          </div>
        </div>
        <div className="w-1/3">
          <div className="bg-white p-7 h-full">
            <PieChart
              title="Vendors"
              data={vendorsMetrics || []}
              colors={pieColors}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
