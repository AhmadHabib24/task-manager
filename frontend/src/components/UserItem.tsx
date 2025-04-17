import React from 'react';
import { User } from '../types';

interface UserItemProps {
  user: User;
  onDelete: (id: string) => void;
  onEdit: (user: User) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onDelete, onEdit }) => {
  return (
    <div className="user-item">
      <div className="user-info">
        <h3>{user.name}</h3>
        <p className="user-email">{user.email}</p>
      </div>
      
      <div className="user-actions">
        <button 
          className="edit-button"
          onClick={() => onEdit(user)}
        >
          Edit
        </button>
        <button 
          className="delete-button"
          onClick={() => onDelete(user._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserItem;