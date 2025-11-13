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
        <Input
          type="text"
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          className="bg-white dark:bg-gray-700"
        />
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