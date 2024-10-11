import { Task } from '../types';

export class TaskService {
    private tasks: Task[] = [];

    async createTask(task: Omit<Task, 'id'>): Promise<Task> {
        const newTask: Task = {
            ...task,
            id: Date.now().toString(),
        };
        this.tasks.push(newTask);
        return newTask;
    }

    async getTasks(): Promise<Task[]> {
        return this.tasks;
    }

    async updateTask(id: string, updates: Partial<Task>): Promise<Task | null> {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) return null;

        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates };
        return this.tasks[taskIndex];
    }

    async deleteTask(id: string): Promise<boolean> {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== id);
        return this.tasks.length < initialLength;
    }
}
