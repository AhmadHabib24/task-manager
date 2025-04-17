import React, { useState, useEffect } from 'react';
import { User, CreateUserPayload } from '../types';

interface UserFormProps {
  onSubmit: (user: CreateUserPayload) => void;
  userToEdit: User | null;
  onCancelEdit: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  userToEdit,
  onCancelEdit
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Load user data if editing
  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setPassword('');
      setConfirmPassword('');
    }
  }, [userToEdit]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!userToEdit || (userToEdit && password)) {
      if (!password) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData: CreateUserPayload & { password?: string } = {
      name: name.trim(),
      email: email.trim(),
      role: "user"
    };

    // Only include password if it's provided
    if (password) {
      userData.password = password;
    }

    onSubmit(userData as CreateUserPayload);

    // Reset form if not editing
    if (!userToEdit) {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="user-form-container">
      <h2>{userToEdit ? 'Edit User' : 'Create New User'}</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password{userToEdit ? ' (Leave blank to keep current)' : ''}:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errors.confirmPassword ? 'input-error' : ''}
            disabled={!password && !!userToEdit}
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        <div className="form-actions">
          {userToEdit && (
            <button
              type="button"
              className="cancel-button"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="submit-button">
            {userToEdit ? 'Update User' : 'Create User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;