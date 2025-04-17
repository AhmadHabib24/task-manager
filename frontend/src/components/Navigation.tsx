import React from 'react';

interface NavigationProps {
  activePage: 'tasks' | 'users';
  onNavigate: (page: 'tasks' | 'users') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activePage, onNavigate }) => {
  return (
    <nav className="main-navigation">
      <ul>
        <li className={activePage === 'tasks' ? 'active' : ''}>
          <button onClick={() => onNavigate('tasks')}>Tasks</button>
        </li>
        <li className={activePage === 'users' ? 'active' : ''}>
          <button onClick={() => onNavigate('users')}>Users</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;