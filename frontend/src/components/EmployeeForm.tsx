import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EmployeeFormProps {
  employee?: { _id?: string; name: string; position: string; department: string };
  onSubmit: (employee: { name: string; position: string; department: string }) => void;
  onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSubmit, onCancel }) => {
  const [name, setName] = useState(employee?.name || '');
  const [position, setPosition] = useState(employee?.position || '');
  const [department, setDepartment] = useState(employee?.department || '');

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setPosition(employee.position);
      setDepartment(employee.department);
    }
  }, [employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, position, department });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-white dark:bg-gray-700"
        />
      </div>
      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Position</label>
        <Input
          type="text"
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
          className="bg-white dark:bg-gray-700"
        />
      </div>
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
        <select
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {employee ? 'Update Employee' : 'Add Employee'}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;