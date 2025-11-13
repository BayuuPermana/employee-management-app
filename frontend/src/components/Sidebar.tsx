import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, Settings } from 'lucide-react';

interface SidebarProps {
  isExpanded: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded }) => {
  return (
    <div className="flex flex-col space-y-1 p-4">
      <Button variant="ghost" className="justify-start px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white">
        <LayoutDashboard className="h-5 w-5" />
        {isExpanded && <span className="ml-3">Dashboard</span>}
      </Button>
      <Button variant="ghost" className="justify-start px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white">
        <Users className="h-5 w-5" />
        {isExpanded && <span className="ml-3">Employees</span>}
      </Button>
      <Button variant="ghost" className="justify-start px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white">
        <Settings className="h-5 w-5" />
        {isExpanded && <span className="ml-3">Settings</span>}
      </Button>
    </div>
  );
};

export default Sidebar;
