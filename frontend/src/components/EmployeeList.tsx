import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Employee {
  _id: string;
  name: string;
  position: string;
  department: string;
}

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onEdit, onDelete }) => {
  if (employees.length === 0) {
    return <div className="text-center text-lg">No employees found.</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Employee List</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Position</TableHead>
              <TableHead className="text-center">Department</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell className="text-center">{employee.name}</TableCell>
                <TableCell className="text-center">{employee.position}</TableCell>
                <TableCell className="text-center">{employee.department}</TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => onEdit(employee)} className="mr-2">
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => onDelete(employee._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeList;