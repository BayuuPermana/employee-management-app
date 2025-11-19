import { Users, Building2 } from 'lucide-react';

interface DashboardStatsProps {
  totalEmployees: number;
  totalDepartments: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ totalEmployees, totalDepartments }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex items-center space-x-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
          <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Employees</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalEmployees}</p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex items-center space-x-4">
        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
          <Building2 className="h-6 w-6 text-green-600 dark:text-green-300" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Departments</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalDepartments}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
