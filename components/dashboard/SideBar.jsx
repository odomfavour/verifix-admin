'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toggleInitateQueryModal } from '@/provider/redux/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setActiveVendor } from '@/provider/redux/userSlice';

const Sidebar = () => {
  const reduxUser = useSelector((state) => state.user.user);
  const activeVendor = useSelector((state) => state.user.activeVendor);
  const router = useRouter();
  const [user, setUser] = useState(reduxUser || {});
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(() => {
    const storedVendor = JSON.parse(localStorage.getItem('activeVendor'));
    return storedVendor || 'mainUser';
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('verifixUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (reduxUser) {
      // If no user in local storage, fall back to Redux user
      setUser(reduxUser);
    }
  }, [reduxUser]);

  // const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);

  const [vendors, setVendors] = useState([]);

  // useEffect(() => {
  //   const getVendors = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.BASEURL}/user/`, {
  //         headers: {
  //           Authorization: `Bearer ${reduxUser?.token}`,
  //         },
  //       });
  //       console.log('res', response.data);

  //       setVendors(response.data.user.vendor);
  //       setLoading(false);
  //       // toast.success(`${response?.data?.message}`);
  //     } catch (error) {
  //       console.log('err', error);

  //       const errorMessage =
  //         error?.response?.data?.message ||
  //         error?.response?.data?.errors ||
  //         error?.message ||
  //         'Unknown error';
  //       if (errorMessage !== 'Unauthorized') {
  //         toast.error(`${errorMessage}`);
  //       }
  //       if (error?.response?.data?.statusCode === 401) {
  //         router.push('/auth/login');
  //       }
  //       setLoading(false);
  //     }
  //   };

  //   getVendors();
  // }, [user, reduxUser, reduxUser?.token, router]);

  return (
    <section className="bg-home-pattern bg-[#040b1d]">
      <div className="w-[220px] flex justify-center min-h-[80px] items-center bg-[#040b1d]  bg-home-pattern bg-cover bg-center">
        <Link href="/">
          <Image
            src="/verifix-logo.svg"
            alt="the product logo"
            width="119"
            height="42"
          />
        </Link>
      </div>
      <div className="bg-home-pattern bg-[#040b1d]  bg-cover bg-center  fixed w-[220px] p-2">
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            {/* <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
            </h3> */}
            <ul className="pt-3">
              <li
                className={`px-3 py-3 rounded-lg mb-4 last:mb-0 hover:bg-veriGreen ${
                  pathname?.includes('/dashboard') && 'bg-veriGreen'
                }`}
                style={{
                  transition: 'color 0.3s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget
                    ?.querySelector('svg path')
                    ?.setAttribute('stroke', '#98A2B3');
                }}
                onMouseOut={(e) => {
                  e.currentTarget
                    ?.querySelector('svg path')
                    ?.setAttribute('stroke', '#98A2B3');
                }}
              >
                <Link
                  href="/dashboard"
                  className={`block hover:text-veriDark  truncate transition duration-150 ${
                    pathname?.includes('/vendor-dashboard')
                      ? 'text-veriDark hover:text-veriDark'
                      : 'text-[#808080]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.99984 7.23193C4.99984 6.7717 5.37293 6.3986 5.83317 6.3986H9.99984C10.4601 6.3986 10.8332 6.7717 10.8332 7.23193C10.8332 7.69217 10.4601 8.06527 9.99984 8.06527H5.83317C5.37293 8.06527 4.99984 7.69217 4.99984 7.23193Z"
                          fill={`${
                            pathname?.includes('/dashboard')
                              ? '#90b854'
                              : '#98A2B3'
                          }`}
                        />
                        <path
                          d="M5.83317 9.73193C5.37293 9.73193 4.99984 10.105 4.99984 10.5653C4.99984 11.0255 5.37293 11.3986 5.83317 11.3986H13.3332C13.7934 11.3986 14.1665 11.0255 14.1665 10.5653C14.1665 10.105 13.7934 9.73193 13.3332 9.73193H5.83317Z"
                          fill={`${
                            pathname?.includes('/dashboard')
                              ? '#90b854'
                              : '#98A2B3'
                          }`}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.8332 16.7736L13.9998 15.8986C14.2883 15.6822 14.6392 15.5653 14.9998 15.5653C16.8408 15.5653 18.3332 14.0729 18.3332 12.2319V5.56527C18.3332 3.72432 16.8408 2.23193 14.9998 2.23193H4.99984C3.15889 2.23193 1.6665 3.72432 1.6665 5.56527V12.2319C1.6665 14.0729 3.15889 15.5653 4.99984 15.5653H6.6665C7.02712 15.5653 7.37801 15.6822 7.6665 15.8986L8.83317 16.7736C10.0184 17.6625 11.648 17.6625 12.8332 16.7736ZM14.9998 13.8986C14.2786 13.8986 13.5768 14.1325 12.9998 14.5653L11.8332 15.4403C11.2406 15.8847 10.4258 15.8847 9.83317 15.4403L8.6665 14.5653C8.08952 14.1325 7.38774 13.8986 6.6665 13.8986H4.99984C4.07936 13.8986 3.33317 13.1524 3.33317 12.2319V5.56527C3.33317 4.64479 4.07936 3.8986 4.99984 3.8986H14.9998C15.9203 3.8986 16.6665 4.64479 16.6665 5.56527V12.2319C16.6665 13.1524 15.9203 13.8986 14.9998 13.8986Z"
                          fill={`${
                            pathname?.includes('/dashboard')
                              ? '#90b854'
                              : '#98A2B3'
                          }`}
                        />
                      </svg>

                      <span className="text-base font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Dashboard
                      </span>
                    </div>
                  </div>
                </Link>
              </li>

              <li
                className={`px-3 py-3 rounded-lg mb-4 last:mb-0 hover:bg-veriGreen ${
                  pathname?.includes('/customers') && 'bg-veriGreen'
                }`}
                style={{
                  transition: 'color 0.3s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget
                    ?.querySelector('svg path')
                    ?.setAttribute('stroke', '#98A2B3');
                }}
                onMouseOut={(e) => {
                  e.currentTarget
                    ?.querySelector('svg path')
                    ?.setAttribute('stroke', '#98A2B3');
                }}
              >
                <Link
                  href="/customers"
                  className={`block hover:text-veriDark  truncate transition duration-150 ${
                    pathname?.includes('/customers')
                      ? 'text-veriDark hover:text-veriDark'
                      : 'text-[#808080]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.99984 7.23193C4.99984 6.7717 5.37293 6.3986 5.83317 6.3986H9.99984C10.4601 6.3986 10.8332 6.7717 10.8332 7.23193C10.8332 7.69217 10.4601 8.06527 9.99984 8.06527H5.83317C5.37293 8.06527 4.99984 7.69217 4.99984 7.23193Z"
                          fill={`${
                            pathname?.includes('/customers')
                              ? '#90b854'
                              : '#98A2B3'
                          }`}
                        />
                        <path
                          d="M5.83317 9.73193C5.37293 9.73193 4.99984 10.105 4.99984 10.5653C4.99984 11.0255 5.37293 11.3986 5.83317 11.3986H13.3332C13.7934 11.3986 14.1665 11.0255 14.1665 10.5653C14.1665 10.105 13.7934 9.73193 13.3332 9.73193H5.83317Z"
                          fill={`${
                            pathname?.includes('/customers')
                              ? '#90b854'
                              : '#98A2B3'
                          }`}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.8332 16.7736L13.9998 15.8986C14.2883 15.6822 14.6392 15.5653 14.9998 15.5653C16.8408 15.5653 18.3332 14.0729 18.3332 12.2319V5.56527C18.3332 3.72432 16.8408 2.23193 14.9998 2.23193H4.99984C3.15889 2.23193 1.6665 3.72432 1.6665 5.56527V12.2319C1.6665 14.0729 3.15889 15.5653 4.99984 15.5653H6.6665C7.02712 15.5653 7.37801 15.6822 7.6665 15.8986L8.83317 16.7736C10.0184 17.6625 11.648 17.6625 12.8332 16.7736ZM14.9998 13.8986C14.2786 13.8986 13.5768 14.1325 12.9998 14.5653L11.8332 15.4403C11.2406 15.8847 10.4258 15.8847 9.83317 15.4403L8.6665 14.5653C8.08952 14.1325 7.38774 13.8986 6.6665 13.8986H4.99984C4.07936 13.8986 3.33317 13.1524 3.33317 12.2319V5.56527C3.33317 4.64479 4.07936 3.8986 4.99984 3.8986H14.9998C15.9203 3.8986 16.6665 4.64479 16.6665 5.56527V12.2319C16.6665 13.1524 15.9203 13.8986 14.9998 13.8986Z"
                          fill={`${
                            pathname?.includes('/customers')
                              ? '#90b854'
                              : '#98A2B3'
                          }`}
                        />
                      </svg>

                      <span className="text-base font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Customers
                      </span>
                    </div>
                    {/* <div className="text-veriDark px-2 rounded-[10px] bg-[#F0F2F5]">
                      <p className="mb-0">4</p>
                    </div> */}
                  </div>
                </Link>
              </li>
              <li
                className={`px-3 py-3 rounded-lg mb-4 last:mb-0 hover:bg-veriGreen ${
                  pathname?.includes('/vendors') && 'bg-veriGreen'
                }`}
                style={{
                  transition: 'color 0.3s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget
                    ?.querySelector('svg path')
                    ?.setAttribute('stroke', '#98A2B3');
                }}
                onMouseOut={(e) => {
                  e.currentTarget
                    ?.querySelector('svg path')
                    ?.setAttribute('stroke', '#98A2B3');
                }}
              >
                <Link
                  href="/vendors"
                  className={`block hover:text-veriDark  truncate transition duration-150 ${
                    pathname?.includes('/vendors')
                      ? 'text-veriDark hover:text-veriDark'
                      : 'text-[#808080]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.99984 7.23193C4.99984 6.7717 5.37293 6.3986 5.83317 6.3986H9.99984C10.4601 6.3986 10.8332 6.7717 10.8332 7.23193C10.8332 7.69217 10.4601 8.06527 9.99984 8.06527H5.83317C5.37293 8.06527 4.99984 7.69217 4.99984 7.23193Z"
                          fill={`${
                            pathname?.includes('/vendors')
                              ? '#90b854'
                              : '#98A2B3'
                          }`}
                        />
                        <path
                          d="M5.83317 9.73193C5.37293 9.73193 4.99984 10.105 4.99984 10.5653C4.99984 11.0255 5.37293 11.3986 5.83317 11.3986H13.3332C13.7934 11.3986 14.1665 11.0255 14.1665 10.5653C14.1665 10.105 13.7934 9.73193 13.3332 9.73193H5.83317Z"
                          fill={`${
                            pathname?.includes('/vendors')
                              ? '#90b854'
                              : '#98A2B3'
                          }`}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.8332 16.7736L13.9998 15.8986C14.2883 15.6822 14.6392 15.5653 14.9998 15.5653C16.8408 15.5653 18.3332 14.0729 18.3332 12.2319V5.56527C18.3332 3.72432 16.8408 2.23193 14.9998 2.23193H4.99984C3.15889 2.23193 1.6665 3.72432 1.6665 5.56527V12.2319C1.6665 14.0729 3.15889 15.5653 4.99984 15.5653H6.6665C7.02712 15.5653 7.37801 15.6822 7.6665 15.8986L8.83317 16.7736C10.0184 17.6625 11.648 17.6625 12.8332 16.7736ZM14.9998 13.8986C14.2786 13.8986 13.5768 14.1325 12.9998 14.5653L11.8332 15.4403C11.2406 15.8847 10.4258 15.8847 9.83317 15.4403L8.6665 14.5653C8.08952 14.1325 7.38774 13.8986 6.6665 13.8986H4.99984C4.07936 13.8986 3.33317 13.1524 3.33317 12.2319V5.56527C3.33317 4.64479 4.07936 3.8986 4.99984 3.8986H14.9998C15.9203 3.8986 16.6665 4.64479 16.6665 5.56527V12.2319C16.6665 13.1524 15.9203 13.8986 14.9998 13.8986Z"
                          fill={`${
                            pathname?.includes('/vendors')
                              ? '#90b854'
                              : '#98A2B3'
                          }`}
                        />
                      </svg>

                      <span className="text-base font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Vendors
                      </span>
                    </div>
                    {/* <div className="text-veriDark px-2 rounded-[10px] bg-[#F0F2F5]">
                      <p className="mb-0">4</p>
                    </div> */}
                  </div>
                </Link>
              </li>

              <li
                className={`px-3 py-3 rounded-lg mb-4 last:mb-0 hover:bg-veriGreen ${
                  pathname?.includes('/queries') && 'bg-veriGreen'
                }`}
                style={{
                  transition: 'color 0.3s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget
                    ?.querySelector('svg path')
                    ?.setAttribute('stroke', '#98A2B3');
                }}
                onMouseOut={(e) => {
                  e.currentTarget
                    ?.querySelector('svg path')
                    ?.setAttribute('stroke', '#98A2B3');
                }}
              >
                <Link
                  href="/queries"
                  className={`block hover:text-veriDark  truncate transition duration-150 ${
                    pathname?.includes('queries')
                      ? 'text-veriDark hover:text-veriDark'
                      : 'text-[#808080]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.99984 7.23193C4.99984 6.7717 5.37293 6.3986 5.83317 6.3986H9.99984C10.4601 6.3986 10.8332 6.7717 10.8332 7.23193C10.8332 7.69217 10.4601 8.06527 9.99984 8.06527H5.83317C5.37293 8.06527 4.99984 7.69217 4.99984 7.23193Z"
                          fill={`${
                            pathname?.includes('/queries')
                              ? '#90b854'
                              : '#98A2B3'
                          }`}
                        />
                        <path
                          d="M5.83317 9.73193C5.37293 9.73193 4.99984 10.105 4.99984 10.5653C4.99984 11.0255 5.37293 11.3986 5.83317 11.3986H13.3332C13.7934 11.3986 14.1665 11.0255 14.1665 10.5653C14.1665 10.105 13.7934 9.73193 13.3332 9.73193H5.83317Z"
                          fill={`${
                            pathname?.includes('/queries')
                              ? '#90b854'
                              : '#98A2B3'
                          }`}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.8332 16.7736L13.9998 15.8986C14.2883 15.6822 14.6392 15.5653 14.9998 15.5653C16.8408 15.5653 18.3332 14.0729 18.3332 12.2319V5.56527C18.3332 3.72432 16.8408 2.23193 14.9998 2.23193H4.99984C3.15889 2.23193 1.6665 3.72432 1.6665 5.56527V12.2319C1.6665 14.0729 3.15889 15.5653 4.99984 15.5653H6.6665C7.02712 15.5653 7.37801 15.6822 7.6665 15.8986L8.83317 16.7736C10.0184 17.6625 11.648 17.6625 12.8332 16.7736ZM14.9998 13.8986C14.2786 13.8986 13.5768 14.1325 12.9998 14.5653L11.8332 15.4403C11.2406 15.8847 10.4258 15.8847 9.83317 15.4403L8.6665 14.5653C8.08952 14.1325 7.38774 13.8986 6.6665 13.8986H4.99984C4.07936 13.8986 3.33317 13.1524 3.33317 12.2319V5.56527C3.33317 4.64479 4.07936 3.8986 4.99984 3.8986H14.9998C15.9203 3.8986 16.6665 4.64479 16.6665 5.56527V12.2319C16.6665 13.1524 15.9203 13.8986 14.9998 13.8986Z"
                          fill={`${
                            pathname?.includes('/queries')
                              ? '#90b854'
                              : '#98A2B3'
                          }`}
                        />
                      </svg>

                      <span className="text-base font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Queries
                      </span>
                    </div>
                    {/* <div className="text-veriDark px-2 rounded-[10px] bg-[#F0F2F5]">
                      <p className="mb-0">4</p>
                    </div> */}
                  </div>
                </Link>
              </li>
              <li
                className={`px-3 py-3 rounded-lg mb-4 last:mb-0 hover:bg-veriGreen ${
                  pathname?.includes('/profile') && 'bg-veriGreen'
                }`}
                style={{
                  transition: 'color 0.3s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget
                    ?.querySelector('svg path')
                    ?.setAttribute('stroke', '#98A2B3');
                }}
                onMouseOut={(e) => {
                  e.currentTarget
                    ?.querySelector('svg path')
                    ?.setAttribute('stroke', '#98A2B3');
                }}
              >
                <Link
                  href="/profile"
                  className={`block hover:text-veriDark  truncate transition duration-150 ${
                    pathname?.includes('profile')
                      ? 'text-veriDark hover:text-veriDark'
                      : 'text-[#808080]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.99984 7.23193C4.99984 6.7717 5.37293 6.3986 5.83317 6.3986H9.99984C10.4601 6.3986 10.8332 6.7717 10.8332 7.23193C10.8332 7.69217 10.4601 8.06527 9.99984 8.06527H5.83317C5.37293 8.06527 4.99984 7.69217 4.99984 7.23193Z"
                          fill={`${
                            pathname?.includes('/profile')
                              ? '#90b854'
                              : '#98A2B3'
                          }`}
                        />
                        <path
                          d="M5.83317 9.73193C5.37293 9.73193 4.99984 10.105 4.99984 10.5653C4.99984 11.0255 5.37293 11.3986 5.83317 11.3986H13.3332C13.7934 11.3986 14.1665 11.0255 14.1665 10.5653C14.1665 10.105 13.7934 9.73193 13.3332 9.73193H5.83317Z"
                          fill={`${
                            pathname?.includes('/profile')
                              ? '#90b854'
                              : '#98A2B3'
                          }`}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.8332 16.7736L13.9998 15.8986C14.2883 15.6822 14.6392 15.5653 14.9998 15.5653C16.8408 15.5653 18.3332 14.0729 18.3332 12.2319V5.56527C18.3332 3.72432 16.8408 2.23193 14.9998 2.23193H4.99984C3.15889 2.23193 1.6665 3.72432 1.6665 5.56527V12.2319C1.6665 14.0729 3.15889 15.5653 4.99984 15.5653H6.6665C7.02712 15.5653 7.37801 15.6822 7.6665 15.8986L8.83317 16.7736C10.0184 17.6625 11.648 17.6625 12.8332 16.7736ZM14.9998 13.8986C14.2786 13.8986 13.5768 14.1325 12.9998 14.5653L11.8332 15.4403C11.2406 15.8847 10.4258 15.8847 9.83317 15.4403L8.6665 14.5653C8.08952 14.1325 7.38774 13.8986 6.6665 13.8986H4.99984C4.07936 13.8986 3.33317 13.1524 3.33317 12.2319V5.56527C3.33317 4.64479 4.07936 3.8986 4.99984 3.8986H14.9998C15.9203 3.8986 16.6665 4.64479 16.6665 5.56527V12.2319C16.6665 13.1524 15.9203 13.8986 14.9998 13.8986Z"
                          fill={`${
                            pathname?.includes('/profile')
                              ? '#90b854'
                              : '#98A2B3'
                          }`}
                        />
                      </svg>

                      <span className="text-base font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Profile
                      </span>
                    </div>
                    {/* <div className="text-veriDark px-2 rounded-[10px] bg-[#F0F2F5]">
                      <p className="mb-0">4</p>
                    </div> */}
                  </div>
                </Link>
              </li>
            </ul>
            <ul className="mt-[100px]">
              <li
                className={`px-3 py-3 rounded-lg mb-4 last:mb-0 hover:bg-veriGreen ${
                  pathname?.includes('/help-center') && 'bg-veriGreen'
                }`}
                style={{
                  transition: 'color 0.3s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget
                    ?.querySelector('svg path')
                    ?.setAttribute('stroke', '#061D49');
                }}
                onMouseOut={(e) => {
                  e.currentTarget
                    ?.querySelector('svg path')
                    ?.setAttribute('stroke', '#EDEDED');
                }}
              >
                <Link
                  href="/help-center"
                  className={`block hover:text-primary  truncate transition duration-150 ${
                    pathname?.includes('/help-center')
                      ? 'text-veriDark hover:text-veriDark'
                      : 'text-[#808080]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.99996 2.5C5.39759 2.5 1.66663 6.23096 1.66663 10.8333V13.3201C1.66646 13.3296 1.66646 13.3391 1.66663 13.3486V15.3431C1.66663 16.5343 2.63229 17.5 3.82349 17.5C5.01469 17.5 5.98035 16.5343 5.98035 15.3431V13.5422C5.98035 11.9241 4.55131 11.1746 3.33329 11.4231V10.8333C3.33329 7.15143 6.31806 4.16667 9.99996 4.16667C13.6819 4.16667 16.6666 7.15143 16.6666 10.8333V11.4143C15.449 11.1655 14.0196 11.9126 14.0196 13.5324V15.3431C14.0196 15.7402 14.1269 16.1122 14.314 16.4317C13.5764 16.7984 12.5699 17.0834 11.25 17.0834C10.7897 17.0834 10.4166 17.4565 10.4166 17.9167C10.4166 18.3769 10.7897 18.75 11.25 18.75C13.2865 18.75 14.7962 18.1755 15.8303 17.4724C15.943 17.4906 16.0586 17.5 16.1764 17.5C17.3676 17.5 18.3333 16.5343 18.3333 15.3431V13.3482C18.3334 13.339 18.3334 13.3298 18.3333 13.3206V10.8333C18.3333 6.23096 14.6023 2.5 9.99996 2.5ZM16.0433 15.815C16.0856 15.827 16.1303 15.8333 16.1764 15.8333C16.4472 15.8333 16.6666 15.6139 16.6666 15.3431V13.4069C16.6324 13.2496 16.5615 13.1698 16.4968 13.1234C16.4126 13.063 16.2882 13.0255 16.1466 13.0361C16.005 13.0468 15.8876 13.1025 15.8134 13.1748C15.7504 13.2361 15.6862 13.3386 15.6862 13.5324V15.3431C15.6862 15.5258 15.7862 15.6852 15.9344 15.7695C15.9716 15.782 16.0079 15.7972 16.0433 15.815ZM3.33329 15.3431V13.4106C3.36877 13.2559 3.43951 13.1771 3.50431 13.1311C3.58894 13.0711 3.71331 13.0342 3.85446 13.0453C3.99561 13.0565 4.11266 13.1124 4.18682 13.185C4.24982 13.2466 4.31369 13.3493 4.31369 13.5422V15.3431C4.31369 15.6139 4.09422 15.8333 3.82349 15.8333C3.55276 15.8333 3.33329 15.6139 3.33329 15.3431Z"
                          fill="#667185"
                        />
                      </svg>

                      {/* <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.4"
                              d="M12.0934 14.9135C11.5067 15.0868 10.8134 15.1668 10.0001 15.1668H6.00007C5.18674 15.1668 4.49341 15.0868 3.90674 14.9135C4.0534 13.1802 5.8334 11.8135 8.00007 11.8135C10.1667 11.8135 11.9467 13.1802 12.0934 14.9135Z"
                              stroke={`${
                                pathname?.includes('/help-center')
                                  ? '#061D49'
                                  : '#EDEDED'
                              }`}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14.6668 6.50016V10.5002C14.6668 13.0202 13.9068 14.4002 12.0935 14.9135C11.5068 15.0868 10.8135 15.1668 10.0002 15.1668H6.00016C5.18683 15.1668 4.4935 15.0868 3.90683 14.9135C2.0935 14.4002 1.3335 13.0202 1.3335 10.5002V6.50016C1.3335 3.16683 2.66683 1.8335 6.00016 1.8335H10.0002C13.3335 1.8335 14.6668 3.16683 14.6668 6.50016Z"
                              stroke={`${
                                pathname?.includes('/help-center')
                                  ? '#061D49'
                                  : '#EDEDED'
                              }`}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              opacity="0.4"
                              d="M10.3866 7.55318C10.3866 8.87318 9.31995 9.94649 7.99995 9.94649C6.67995 9.94649 5.61328 8.87318 5.61328 7.55318C5.61328 6.23318 6.67995 5.1665 7.99995 5.1665C9.31995 5.1665 10.3866 6.23318 10.3866 7.55318Z"
                              stroke={`${
                                pathname?.includes('/help-center')
                                  ? '#061D49'
                                  : '#EDEDED'
                              }`}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg> */}

                      <span className="text-base font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Help Center
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
            <div className="flex gap-2 items-center my-10">
              <div className="rounded-full w-[36px] h-[36px] flex justify-center bg-primary items-center cursor-pointer">
                {user?.image?.assetUrl ? (
                  <Image
                    src={user?.image?.assetUrl}
                    width={36}
                    height={36}
                    className="rounded-full w-[36px] h-[36px] border-white border"
                    priority
                    alt="avatar"
                  />
                ) : (
                  <div className="border border-white flex justify-center items-center text-veriGreen rounded-full h-[36px] w-[36px]">
                    <p className="flex items-center text-lg">
                      {user?.firstName?.charAt(0)}
                      {user?.lastName?.charAt(0)}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-[#D0D5DD] font-semibold italic text-sm mb-0">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
