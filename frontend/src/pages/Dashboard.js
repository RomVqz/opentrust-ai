import React from 'react';
import TransactionList from '../components/TransactionList';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <TransactionList />
    </div>
  );
};

export default Dashboard;
