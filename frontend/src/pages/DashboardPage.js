import React from 'react';
import logo from '../assets/logo.png';
import TransactionList from '../components/TransactionList';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center mb-6">
        <img src={logo} alt="OpenTrust AI Logo" className="h-12 w-12 mr-4" />
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <TransactionList />
    </div>
  );
};

export default DashboardPage;
