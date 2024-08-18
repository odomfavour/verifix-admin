'use client';
import { useDispatch } from 'react-redux';
import {
  toggleFIRModal,
  toggleSuccessModal,
} from '@/provider/redux/modalSlice';

const FirRegModal = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(toggleFIRModal());
    dispatch(
      toggleSuccessModal({
        title: 'FIRS Details Received',
        subtitle:
          'Your FIRS was successfully received, you will be notified llentesque venenatis finibus arcu,.',
        link: 'https://example.com',
      })
    );
  };
  return (
    <div className="z-50 top-0 min-h-screen bg-[#101010c8] fixed w-full flex justify-center items-center text-veriDark">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="lg:w-2/5 w-11/12 bg-white rounded-[5px] shadow-authModal p-8"
      >
        <div className="text-center mb-5">
          <p className="text-center font-bold text-[20px] mb-1">
            FIRS/LIRS Number
          </p>
          <p className="text-sm font-[#8C94A6] leading-[22px] font-normal">
            Already have a Verifix account?{' '}
          </p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="businessNameInput"
              className="block mb-2 text-sm font-medium"
            >
              FIRS/LIRS Number
            </label>
            <input
              type="text"
              id="businessNameInput"
              placeholder="GF68920P;D"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              className="py-[8px] px-[22px] border border-[#D0D5DD] text-veriGreen w-full"
              onClick={() => dispatch(toggleFIRModal())}
            >
              Cancel
            </button>
            <button
              className="py-[8px] px-[22px] bg-veriGreen text-white w-full"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FirRegModal;
