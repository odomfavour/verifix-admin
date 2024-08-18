'use client';
import React, { useEffect, useRef, useState } from 'react';
import { EnvelopeIcon } from '@/utils/utils';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BsXLg } from 'react-icons/bs';
import { toggleOtpModal } from '@/provider/redux/modalSlice';

interface OtpInputProps {
  length?: number;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 4 }) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill('')); // Initialize state with an array of empty strings
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Move to the next input field if a value is entered
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otpValues.join('');
    console.log('OTP Code:', otpCode);
    router.push('/reset-password');
    // const storedUserData = localStorage.getItem('verifixUserData');
    // if (storedUserData) {
    //   const userData = JSON.parse(storedUserData);
    //   const { email, sessionId } = userData;
    //   setLoading(true);
    //   try {
    //     const response = await axios.post(
    //       `${process.env.BASEURL}/auth/user/verify`,
    //       {
    //         email,
    //         sessionId,
    //         token: otpCode,
    //       }
    //     );
    //     console.log('resp', response);
    //     toast.success(`${response?.data?.message}`);
    //     router.push('/auth/customer-success');
    //     setLoading(false);
    //   } catch (error: any) {
    //     console.log('err', error);
    //     const errorMessage =
    //       error?.response?.data?.message ||
    //       error?.response?.data?.errors ||
    //       error?.message ||
    //       'Unknown error';
    //     toast.error(`${errorMessage}`);
    //     setLoading(false);
    //   } finally {
    //     setLoading(false); // Stop loader, whether request succeeds or fails
    //   }
    // }
  };

  const resendToken = async () => {
    const storedUserData = localStorage.getItem('verifixUserData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      const { email } = userData;
      try {
        const response = await axios.post(
          `${process.env.BASEURL}/auth/verification/send`,
          {
            email,
          }
        );
        console.log('resp', response);
        const userData = {
          email,
          sessionId: response.data.result.sessionId,
        };
        localStorage.setItem('verifixUserData', JSON.stringify(userData));
        toast.success(`${response?.data?.message}`);
        setLoading(false);
      } catch (error: any) {
        console.log('err', error);
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.errors ||
          error?.message ||
          'Unknown error';
        toast.error(`${errorMessage}`);
        setLoading(false);
      } finally {
        setLoading(false); // Stop loader, whether request succeeds or fails
      }
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem('verifixUserData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      const { email } = userData;
      setEmail(email);
    }
  }, []);

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to the previous input field if Backspace is pressed in an empty field
    if (e.key === 'Backspace' && index > 0 && !e.currentTarget.value) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="text-center">
      <div className="flex justify-center items-center mb-5">
        <div className="h-[48px] w-[48px] rounded-full bg-veriGreen flex justify-center items-center">
          <div className="h-[36px] w-[36px] rounded-full bg-white flex justify-center items-center">
            <EnvelopeIcon />
          </div>
        </div>
      </div>
      <p className="font-bold text-xl mb-2 text-[#101828]">
        Please check your email.
      </p>
      <p className="mb-5">
        We&apos;ve sent a code to <span className="font-bold">{email}</span>
      </p>
      <div className="otp-input flex justify-center mx-auto gap-3 text-center">
        {[...Array(length)].map((_, index) => (
          <input
            key={index}
            ref={(input) => {
              inputsRef.current[index] = input;
            }}
            className="border border-veriGreen inline-block h-[80px] w-[80px] text-[36px] italic rounded-lg text-center"
            type="text"
            maxLength={1}
            value={otpValues[index]} // Bind the input value to the state
            onChange={(e) => handleInputChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>
      <div className="my-3 text-sm font-normal">
        Didn’t get a code?{' '}
        <span className="text-veriGreen" role="button" onClick={resendToken}>
          Click to resend
        </span>
        .
      </div>
      <div className="flex mt-5 gap-6">
        <button
          className="w-full py-3 border border-veriGreen text-veriGreen"
          onClick={() => console.log(otpValues)}
        >
          Cancel
        </button>
        <button
          className={`w-full py-3 flex justify-center gap-3 ${
            loading || otpValues.some((value) => !value)
              ? 'bg-gray-300 text-veriDark cursor-not-allowed'
              : 'bg-veriGreen text-white'
          }`}
          onClick={handleVerify}
          disabled={loading || otpValues.some((value) => !value)}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>{' '}
              <span className="">Loading</span>
            </>
          ) : (
            'Verify'
          )}
        </button>
      </div>
    </div>
  );
};

export default OtpInput;
