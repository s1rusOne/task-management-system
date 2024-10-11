export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'done';
    assignee: string;
    dueDate: Date;
    tags: string[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
}