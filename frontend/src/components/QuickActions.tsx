import React from 'react';
import { Button } from '@/components/ui/button';

interface QuickActionsProps {
  onAddEmployee: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAddEmployee }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
      <div className="flex flex-col space-y-2">
        <Button onClick={onAddEmployee}>Add Employee</Button>
        <Button variant="outline">Add Department</Button>
        <Button variant="outline">Generate Report</Button>
      </div>
    </div>
  );
};

export default QuickActions;
