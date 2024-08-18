import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';

const PaymentFrame = () => {
  return (
    <sectiion>
      <div className="flex gap-6">
        <div className="bg-white p-[24px] border border-[#EDEDF2] rounded-[12px] w-2/3">
          <p className="text-lg font-bold mb-2">Payment</p>
          <p className="text-sm font-normal mb-6 text-[#9A9EA7]">
            These are your personal details, they are visible to the public
          </p>
          <form action="">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div>
                <p className="text-[#9A9EA7] mb-1">Primary payout account</p>
                <p className="text-veriDark font-semibold text-lg italic">
                  MasterCard •••• 8464
                </p>
              </div>
              <button className="flex items-center gap-2 text-[#9A9EA7]">
                <FaPencilAlt />
                <p>Edit</p>
              </button>
            </div>
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div>
                <p className="text-[#9A9EA7] mb-1">Secondary payout account</p>
                <p className="text-veriDark font-semibold text-lg italic">
                  MasterCard •••• 8464
                </p>
              </div>
              <button className="flex items-center gap-2 text-[#9A9EA7]">
                <FaPencilAlt />
                <p>Edit</p>
              </button>
            </div>
            <div>
              <button className="flex items-center gap-2 text-[#9A9EA7] font-bold italic">
                <FaCirclePlus />
                <p>Add More</p>
              </button>
            </div>
            <div className="flex mt-5 gap-6">
              <button className="w-full py-3 border border-veriGreen text-veriGreen">
                Cancel
              </button>
              <button className="w-full py-3 bg-veriGreen text-white">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </sectiion>
  );
};

export default PaymentFrame;
