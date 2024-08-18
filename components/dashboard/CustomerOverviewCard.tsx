import { CustomerGraphIcon } from '@/utils/utils';
import React from 'react';

const CustomerOverviewCard = () => {
  return (
    <div>
      <div className="border border-[#E4E7EC] py-[11px] px-[15px] rounded-[10px] bg-white min-h-[300px]">
        <div className="flex justify-between items-center">
          <div className="h-6 w-6 border-[#F0F2F5] border rounded-[6px]  flex justify-center items-center">
            <CustomerGraphIcon />
          </div>
          <div>
            <select
              id="countries"
              className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            >
              <option value="">This Week</option>
              <option value="US">This week</option>
            </select>
          </div>
        </div>
        <p>Total Transactions</p>
        <div className="flex items-center gap-3">
          <p className="text-veriDark font-bold text-lg">29,405</p>
          <div className="px-2">15%</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOverviewCard;
