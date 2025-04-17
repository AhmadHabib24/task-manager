import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import Pagination from '../components/pagination';
import { User, CreateUserPayload, UpdateUserPayload } from '../types';
import * as api from '../services/api';

const UsersPage: React.FC = () => {
  // State management
  const [users, setUsers] = useState<User[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersData = await api.getUsers();
        setUsers(usersData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  
  // Handle pagination
  useEffect(() => {
    // Calculate total pages
    const calculatedTotalPages = Math.ceil(users.length / usersPerPage);
    setTotalPages(calculatedTotalPages || 1); // Ensure at least 1 page
    
    // Adjust current page if it's now out of bounds
    if (currentPage > calculatedTotalPages && calculatedTotalPages > 0) {
      setCurrentPage(calculatedTotalPages);
    }
    
    // Get current users for display
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    setDisplayedUsers(users.slice(indexOfFirstUser, indexOfLastUser));
  }, [users, currentPage, usersPerPage]);

  // Handle user creation/update
  const handleCreateUser = async (userData: CreateUserPayload) => {
    try {
      setLoading(true);
      
      if (userToEdit) {
        // Update existing user
        const updatedUser = await api.updateUser(userToEdit._id, userData);
        setUsers(users.map(user => user._id === userToEdit._id ? updatedUser : user));
        setUserToEdit(null);
      } else {
        // Create new user
        const newUser = await api.createUser(userData);
        setUsers([...users, newUser]);
      }
      
      // Briefly display success message
      const actionType = userToEdit ? 'updated' : 'created';
      setError(null);
      
      // Show success message temporarily
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.textContent = `User successfully ${actionType}!`;
      document.body.appendChild(successMsg);
      
      // Remove after 3 seconds
      setTimeout(() => {
        document.body.removeChild(successMsg);
      }, 3000);
      
    } catch (err: any) {
      setError(`Failed to save user: ${err.response?.data?.message || 'Unknown error occurred'}`);
      console.error('Error saving user:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (id: string) => {
    try {
      setLoading(true);
      await api.deleteUser(id);
      setUsers(users.filter(user => user._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete user. Please try again.');
      console.error('Error deleting user:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit user
  const handleEditUser = (user: User) => {
    setUserToEdit(user);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setUserToEdit(null);
  };
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="users-page">
      <header className="page-header">
        <h1>User Management</h1>
      </header>
      
      <main className="page-main">
        <section className="form-section">
          <UserForm 
            onSubmit={handleCreateUser} 
            userToEdit={userToEdit}
            onCancelEdit={handleCancelEdit}
          />
        </section>
        
        <section className="users-section">
          <div className="users-header">
            <h2>Users</h2>
          </div>
          
          <UserList 
            users={displayedUsers} 
            onDeleteUser={handleDeleteUser}
            onEditUser={handleEditUser}
            loading={loading}
            error={error}
          />
          
          {!loading && !error && users.length > 0 && (
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

export default UsersPage;