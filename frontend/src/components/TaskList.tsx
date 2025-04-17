import React from 'react';
import { Task, User, TaskStatus } from '../types';
import TaskItem from './TaskItem';
import LoadingSpinner from './LoadingSpinner';

interface TaskListProps {
  tasks: Task[];
  users: User[];
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
  loading: boolean;
  error: string | null;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  users,
  onDeleteTask,
  onEditTask,
  onStatusChange,
  loading,
  error
}) => {
  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner size="medium" />
        <div className="loading-message">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (tasks.length === 0) {
    return <div className="empty-message">No tasks found. Create your first task!</div>;
  }

  return (
    <div className="task-list">
      {tasks
        .filter((task): task is Task => task !== null && task !== undefined)
        .map(task => (
          <TaskItem
            key={task._id}
            task={task}
            users={users}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
            onStatusChange={onStatusChange}
          />
        ))}
    </div>
  );
};

export default TaskList;
