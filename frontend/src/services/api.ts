import axios from 'axios';
import { Task, CreateTaskPayload, UpdateTaskPayload, User, CreateUserPayload, UpdateUserPayload } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDQ4MDk0OTF9.7VUrRosSJPebr7nZ7coZegCnQduHpLAdJi4pKCBcz7A';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JWT_TOKEN}`
  },
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${JWT_TOKEN}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get('/tasks');
  return response.data.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data.data;
};

export const createTask = async (task: CreateTaskPayload): Promise<Task> => {
  const response = await api.post('/tasks', task);
  return response.data.data;
};

export const updateTask = async (id: string, task: UpdateTaskPayload): Promise<Task> => {  
  const response = await api.put(`/tasks/${id}`, task);
  return response.data.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data.data;
};

export const createUser = async (user: CreateUserPayload): Promise<User> => {
  const response = await api.post('/users', user);
  return response.data.data;
};

export const updateUser = async (id: string, user: UpdateUserPayload): Promise<User> => {
  const response = await api.put(`/users/${id}`, user);
  return response.data.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};