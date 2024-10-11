"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
class AnalyticsService {
    calculateProductivity(tasks) {
        const completedTasks = tasks.filter(task => task.status === 'done').length;
        return (completedTasks / tasks.length) * 100;
    }
    getTasksByStatus(tasks) {
        return tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {});
    }
    getMostProductiveUser(tasks) {
        const userProductivity = {};
        tasks.forEach(task => {
            if (!userProductivity[task.assignee]) {
                userProductivity[task.assignee] = { completed: 0, total: 0 };
            }
            userProductivity[task.assignee].total++;
            if (task.status === 'done') {
                userProductivity[task.assignee].completed++;
            }
        });
        let mostProductiveUser = null;
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
exports.AnalyticsService = AnalyticsService;
