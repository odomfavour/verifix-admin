'use client';
import React, { useState } from 'react';
import ServiceListTable from '../vendors/ServiceListTable';

const ServicesFrame = () => {
  const [services, setServices] = useState([
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
  ]);
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <p className="text-[#101928] font-semibold text-lg">Services</p>
          <p>These are your personal details, they are visible to the public</p>
        </div>
        <div className="flex gap-3">
          <button className="py-[8px] px-[22px] border text-white bg-veriGreen">
            Add New Service
          </button>
        </div>
      </div>
      <div>
        <ServiceListTable data={services} />
      </div>
    </div>
  );
};

export default ServicesFrame;
