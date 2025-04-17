import React from 'react';
import { User } from '../types';
import UserItem from './UserItem';
import LoadingSpinner from './LoadingSpinner';

interface UserListProps {
  users: User[];
  onDeleteUser: (id: string) => void;
  onEditUser: (user: User) => void;
  loading: boolean;
  error: string | null;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onDeleteUser,
  onEditUser,
  loading,
  error
}) => {
  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner size="medium" />
        <div className="loading-message">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (users.length === 0) {
    return <div className="empty-message">No users found. Create your first user!</div>;
  }

  return (
    <div className="user-list">
      {users.map(user => (
        <UserItem
          key={user._id}
          user={user}
          onDelete={onDeleteUser}
          onEdit={onEditUser}
        />
      ))}
    </div>
  );
};

export default UserList;