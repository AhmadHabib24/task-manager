import React from 'react';
import { Task, User, TaskStatus } from '../types';

interface TaskItemProps {
  task: Task;
  users: User[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  users, 
  onDelete, 
  onEdit, 
  onStatusChange 
}) => {
  const assignedUser = users.find(user => user._id === task.assignedTo);
  
  const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
      case 'todo':
        return '#ffcc80'; // Light orange
      case 'in-progress':
        return '#90caf9'; // Light blue
      case 'done':
        return '#a5d6a7'; // Light green
      default:
        return '#e0e0e0'; // Light grey
    }
  };

  return (
    <div className="task-item" style={{ borderLeft: `4px solid ${getStatusColor(task.status)}` }}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className="task-actions">
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => onDelete(task._id)}>Delete</button>
        </div>
      </div>
      
      <p className="task-description">{task.description}</p>
      
      <div className="task-details">
        <div className="task-status">
          <label>Status: </label>
          <select 
            value={task.status} 
            onChange={(e) => onStatusChange(task._id, e.target.value as TaskStatus)}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        
        <div className="task-assignment">
          <span>Assigned to: </span>
          <strong>{assignedUser ? assignedUser.name : 'Test User'}</strong>
        </div>
        
        <div className="task-date">
          <span>Created: </span>
          {new Date(task.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;