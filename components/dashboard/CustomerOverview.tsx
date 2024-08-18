import { CustomerGraphIcon } from '@/utils/utils';
import React from 'react';
import CustomerOverviewCard from './CustomerOverviewCard';

const CustomerOverview = () => {
  return (
    <section>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <CustomerOverviewCard />
        <CustomerOverviewCard />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <CustomerOverviewCard />
        <CustomerOverviewCard />
        <CustomerOverviewCard />
      </div>
    </section>
  );
};

export default CustomerOverview;
