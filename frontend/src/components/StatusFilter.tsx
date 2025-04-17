import React from 'react';
import { TaskStatus } from '../types';

interface StatusFilterProps {
  currentStatus: TaskStatus | 'all';
  onStatusChange: (status: TaskStatus | 'all') => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ currentStatus, onStatusChange }) => {
  return (
    <div className="status-filter">
      <h3>Filter by Status</h3>
      <div className="filter-buttons">
        <button 
          className={currentStatus === 'all' ? 'active' : ''} 
          onClick={() => onStatusChange('all')}
        >
          All
        </button>
        <button 
          className={currentStatus === 'todo' ? 'active' : ''} 
          onClick={() => onStatusChange('todo')}
        >
          To Do
        </button>
        <button 
          className={currentStatus === 'in-progress' ? 'active' : ''} 
          onClick={() => onStatusChange('in-progress')}
        >
          In Progress
        </button>
        <button 
          className={currentStatus === 'done' ? 'active' : ''} 
          onClick={() => onStatusChange('done')}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default StatusFilter;