export interface User {
    _id: string;
    name: string;
    email: string;
  }
  
  export type TaskStatus = 'todo' | 'in-progress' | 'done';
  
  export interface Task {
    _id: string;
    title: string;
    description: string;
    status: TaskStatus;
    assignedTo: string;
    createdAt: Date;
    user?: User; // For populated user data
  }
  
  export interface CreateTaskPayload {
    title: string;
    description: string;
    status: TaskStatus;
    assignto?:string
  }
  
  export interface UpdateTaskPayload {
    title?: string;
    description?: string;
    status?: TaskStatus;
    assignto?:string
  }
  
  // User payloads
  export interface CreateUserPayload {
    name: string;
    email: string;
    password?: string;
    role:string
  }
  
  export interface UpdateUserPayload {
    name?: string;
    email?: string;
    password?: string;
  }