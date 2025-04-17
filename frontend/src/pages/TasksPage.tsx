import React, { useState, useEffect } from 'react';
import { TaskList, TaskForm, StatusFilter, Pagination } from '../components';
import { Task, User, TaskStatus, CreateTaskPayload, UpdateTaskPayload } from '../types';
import * as api from '../services/api';

const TasksPage: React.FC = () => {
  // State management
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [displayedTasks, setDisplayedTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentFilter, setCurrentFilter] = useState<TaskStatus | 'all'>('all');
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tasksPerPage] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Fetch tasks and users on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tasksData, usersData] = await Promise.all([
          api.getTasks(),
          api.getUsers()
        ]);
        setTasks(tasksData);
        setUsers(usersData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter tasks when tasks or filter changes
  useEffect(() => {
    if (currentFilter === 'all') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.status === currentFilter));
    }
    
    // Reset to first page whenever filter changes
    setCurrentPage(1);
  }, [tasks, currentFilter]);
  
  // Handle pagination of filtered tasks
  useEffect(() => {
    // Calculate total pages
    const calculatedTotalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    setTotalPages(calculatedTotalPages || 1); // Ensure at least 1 page
    
    // Adjust current page if it's now out of bounds
    if (currentPage > calculatedTotalPages && calculatedTotalPages > 0) {
      setCurrentPage(calculatedTotalPages);
    }
    
    // Get current tasks for display
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    setDisplayedTasks(filteredTasks.slice(indexOfFirstTask, indexOfLastTask));
  }, [filteredTasks, currentPage, tasksPerPage]);

  // Handle filter change
  const handleFilterChange = (status: TaskStatus | 'all') => {
    setCurrentFilter(status);
  };

  // Handle task creation
  const handleCreateTask = async (taskData: CreateTaskPayload) => {
    try {
      setLoading(true);
      
      if (taskToEdit) {
        // Update existing task
        const updatedTask = await api.updateTask(taskToEdit._id, taskData);
        setTasks(tasks.map(task => task._id === taskToEdit._id ? updatedTask : task));
        setTaskToEdit(null);
      } else {
        // Create new task
        const newTask = await api.createTask(taskData);
        setTasks([...tasks, newTask]);
      }
      
      // Briefly display success message
      const actionType = taskToEdit ? 'updated' : 'created';
      setError(null);
      
      // Show success message temporarily
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.textContent = `Task successfully ${actionType}!`;
      document.body.appendChild(successMsg);
      
      // Remove after 3 seconds
      setTimeout(() => {
        document.body.removeChild(successMsg);
      }, 3000);
      
    } catch (err: any) {
      setError(`Failed to save task: ${err.response?.data?.message || 'Unknown error occurred'}`);
      console.error('Error saving task:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (id: string) => {
    try {
      setLoading(true);
      await api.deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit task
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setTaskToEdit(null);
  };

  // Handle status change
  const handleStatusChange = async (id: string, status: TaskStatus) => {
    try {
      setLoading(true);
      const payload: UpdateTaskPayload = { status };
      const updatedTask = await api.updateTask(id, payload);
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
      setError(null);
    } catch (err) {
      setError('Failed to update task status. Please try again.');
      console.error('Error updating task status:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="tasks-page">
      <header className="page-header">
        <h1>Task Management</h1>
      </header>
      
      <main className="page-main">
        <section className="form-section">
          <TaskForm 
            users={users} 
            onSubmit={handleCreateTask} 
            taskToEdit={taskToEdit}
            onCancelEdit={handleCancelEdit}
          />
        </section>
        
        <section className="tasks-section">
          <div className="tasks-header">
            <h2>Tasks</h2>
            <StatusFilter 
              currentStatus={currentFilter} 
              onStatusChange={handleFilterChange} 
            />
          </div>
          
          <TaskList 
            tasks={displayedTasks} 
            users={users}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            onStatusChange={handleStatusChange}
            loading={loading}
            error={error}
          />
          
          {!loading && !error && filteredTasks.length > 0 && (
            <div className="pagination-container">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default TasksPage;