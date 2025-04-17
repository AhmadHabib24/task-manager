import React, { useState, useEffect } from 'react';
import { User, Task, TaskStatus, CreateTaskPayload } from '../types';

interface TaskFormProps {
  users: User[];
  onSubmit: (task: CreateTaskPayload) => void;
  taskToEdit: Task | null;
  onCancelEdit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  users, 
  onSubmit, 
  taskToEdit, 
  onCancelEdit 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [assignedTo, setAssignedTo] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Load task data if editing
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
      setAssignedTo(taskToEdit.assignedTo);
    }
  }, [taskToEdit]);

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!assignedTo) {
      newErrors.assignedTo = 'Please assign this task to a user';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const taskData: CreateTaskPayload = {
      title: title.trim(),
      description: description.trim(),
      status,
      assignto: assignedTo,
    };
    
    onSubmit(taskData);
    
    // Reset form if not editing
    if (!taskToEdit) {
      setTitle('');
      setDescription('');
      setStatus('todo');
      setAssignedTo('');
    }
  };

  return (
    <div className="task-form-container">
      <h2>{taskToEdit ? 'Edit Task' : 'Create New Task'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? 'input-error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={errors.description ? 'input-error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="assignedTo">Assign to:</label>
          <select
            id="assignedTo"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className={errors.assignedTo ? 'input-error' : ''}
          >
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.assignedTo && <span className="error-message">{errors.assignedTo}</span>}
        </div>
        
        <div className="form-actions">
          {taskToEdit && (
            <button 
              type="button" 
              className="cancel-button"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="submit-button">
            {taskToEdit ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;