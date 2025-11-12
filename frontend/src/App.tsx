import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Sidebar from './components/Sidebar';
import DashboardStats from './components/DashboardStats';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';

interface Employee {
  _id: string;
  name: string;
  position: string;
  department: string;
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to fetch employees.');
    }
  };

  const addEmployee = async (employee: { name: string; position: string; department: string }) => {
    try {
      await axios.post('http://localhost:5000/api/employees', employee);
      fetchEmployees(); // Refresh the list
      setShowAddForm(false); // Close the form
      toast.success('Employee added successfully!');
    } catch (error) {
      console.error('Error adding employee:', error);
      toast.error('Failed to add employee.');
    }
  };

  const updateEmployee = async (id: string, employee: { name: string; position: string; department: string }) => {
    try {
      await axios.put(`http://localhost:5000/api/employees/${id}`, employee);
      fetchEmployees(); // Refresh the list
      setEditingEmployee(null); // Close the form
      toast.success('Employee updated successfully!');
    } catch (error) {
      console.error('Error updating employee:', error);
      toast.error('Failed to update employee.');
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployees(); // Refresh the list
      toast.success('Employee deleted successfully!');
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast.error('Failed to delete employee.');
    }
  };

  const recentActivities = employees
    .sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime())
    .slice(0, 5)
    .map(emp => ({
      id: emp._id,
      message: `${emp.name} (${emp.position}) in ${emp.department} was recently updated.`, // Customize message as needed
      timestamp: emp.updatedAt || emp.createdAt,
    }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Toaster />
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <nav className="px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <Sidebar />
              </SheetContent>
            </Sheet>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Employee Management</h1>
          </div>
          <div className="space-x-4">
            <Button variant="ghost">Home</Button>
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Contact</Button>
          </div>
        </nav>
      </header>
      <main className="flex-grow p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1">
            <RecentActivity activities={recentActivities} />
          </div>
          <div className="lg:col-span-2">
            <EmployeeList employees={employees} onEdit={setEditingEmployee} onDelete={deleteEmployee} />
          </div>
          <div className="lg:col-span-1 space-y-4">
            <DashboardStats totalEmployees={employees.length} totalDepartments={new Set(employees.map(e => e.department)).size} />
            <QuickActions onAddEmployee={() => setShowAddForm(true)} />
          </div>
        </div>

        <Dialog open={showAddForm || !!editingEmployee} onOpenChange={() => {
          setShowAddForm(false);
          setEditingEmployee(null);
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
            </DialogHeader>
            <EmployeeForm
              employee={editingEmployee || undefined}
              onSubmit={editingEmployee ? (emp) => updateEmployee(editingEmployee._id, emp) : addEmployee}
              onCancel={() => {
                setShowAddForm(false);
                setEditingEmployee(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </main>
      <footer className="bg-white dark:bg-gray-800 shadow-md mt-auto">
        <div className="mx-auto px-4 py-2 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 Employee Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;