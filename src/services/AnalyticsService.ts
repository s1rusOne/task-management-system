import { Task } from '../types';

export class AnalyticsService {
    calculateProductivity(tasks: Task[]): number {
        const completedTasks = tasks.filter(task => task.status === 'done').length;
        return (completedTasks / tasks.length) * 100;
    }

    getTasksByStatus(tasks: Task[]): Record<Task['status'], number> {
        return tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {} as Record<Task['status'], number>);
    }

    getMostProductiveUser(tasks: Task[]): string | null {
        const userProductivity: Record<string, { completed: number; total: number }> = {};

        tasks.forEach(task => {
            if (!userProductivity[task.assignee]) {
                userProductivity[task.assignee] = { completed: 0, total: 0 };
            }
            userProductivity[task.assignee].total++;
            if (task.status === 'done') {
                userProductivity[task.assignee].completed++;
            }
        });

        let mostProductiveUser: string | null = null;
        let highestProductivity = 0;

        Object.entries(userProductivity).forEach(([user, { completed, total }]) => {
            const productivity = completed / total;
            if (productivity > highestProductivity) {
                highestProductivity = productivity;
                mostProductiveUser = user;
            }
        });

        return mostProductiveUser;
    }
}