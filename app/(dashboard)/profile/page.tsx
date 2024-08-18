'use client';
import BusinessDetailFrame from '@/components/settings/BusinessDetailFrame';
import NotificationsFrame from '@/components/settings/NotificationsFrame';
import PaymentFrame from '@/components/settings/PaymentFrame';
import ProfileFrame from '@/components/settings/ProfileFrame';
import SettingsFrame from '@/components/settings/SettingsFrame';
import { useState } from 'react';

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  return (
    <div>
      <p className="text-[28px] font-bold text-[#101928]">Profile Setting</p>
      <p className="mb-5 text-[#667185] text-sm font-normal">
        Control your profile setup and integrations
      </p>
      <div className="flex items-center gap-4">
        <button
          className={`p-4 text-sm ${
            activeTab == 'profile'
              ? 'border-b border-veriGreen text-veriGreen'
              : ''
          }`}
          onClick={() => setActiveTab('profile')}
        >
          Profile information
        </button>
        {/* <button
          className={`p-4 text-sm ${
            activeTab == 'business'
              ? 'border-b border-veriGreen text-veriGreen'
              : ''
          }`}
          onClick={() => setActiveTab('business')}
        >
          Business Details
        </button> */}
        <button
          className={`p-4 text-sm ${
            activeTab == 'notifications'
              ? 'border-b border-veriGreen text-veriGreen'
              : ''
          }`}
          onClick={() => setActiveTab('notifications')}
        >
          Notification
        </button>
        <button
          className={`p-4 text-sm ${
            activeTab == 'payment'
              ? 'border-b border-veriGreen text-veriGreen'
              : ''
          }`}
          onClick={() => setActiveTab('payment')}
        >
          Payment
        </button>
        <button
          className={`p-4 text-sm ${
            activeTab == 'settings'
              ? 'border-b border-veriGreen text-veriGreen'
              : ''
          }`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div className="my-6">
        {activeTab == 'profile' && <ProfileFrame />}
        {activeTab == 'business' && <BusinessDetailFrame />}
        {activeTab == 'notifications' && <NotificationsFrame />}
        {activeTab == 'payment' && <PaymentFrame />}
        {activeTab == 'settings' && <SettingsFrame />}
      </div>
    </div>
  );
};

export default SettingPage;
