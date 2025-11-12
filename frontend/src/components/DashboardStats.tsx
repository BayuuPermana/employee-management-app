import React from 'react';

interface DashboardStatsProps {
  totalEmployees: number;
  totalDepartments: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ totalEmployees, totalDepartments }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
          <p className="text-3xl font-bold">{totalEmployees}</p>
          <p className="text-gray-600 dark:text-gray-400">Total Employees</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
          <p className="text-3xl font-bold">{totalDepartments}</p>
          <p className="text-gray-600 dark:text-gray-400">Total Departments</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
