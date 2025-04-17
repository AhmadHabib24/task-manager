import React, { useState } from 'react';
import './App.css';
import TasksPage from './pages/TasksPage';
import UsersPage from './pages/UsersPage';
import Navigation from './components/Navigation';

type ActivePage = 'tasks' | 'users';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>('tasks');

  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        <Navigation activePage={activePage} onNavigate={handleNavigate} />
      </header>
      
      <div className="App-content">
        {activePage === 'tasks' ? (
          <TasksPage />
        ) : (
          <UsersPage />
        )}
      </div>
    </div>
  );
};

export default App;