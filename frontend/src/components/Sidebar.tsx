import React from 'react';
import { Button } from '@/components/ui/button';

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2 p-4">
      <Button variant="ghost">Dashboard</Button>
      <Button variant="ghost">Employees</Button>
      <Button variant="ghost">Settings</Button>
    </div>
  );
};

export default Sidebar;
