import express from 'express';
import { TaskService } from '../services/TaskService';
import { AnalyticsService } from '../services/AnalyticsService';

const router = express.Router();
const taskService = new TaskService();
const analyticsService = new AnalyticsService();

router.post('/tasks', async (req, res) => {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
});

router.get('/tasks', async (req, res) => {
    const tasks = await taskService.getTasks();
    res.json(tasks);
});

router.put('/tasks/:id', async (req, res) => {
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
    if (updatedTask) {
        res.json(updatedTask);
    } else {
        res.status(404).send('Task not found');
    }
});

router.delete('/tasks/:id', async (req, res) => {
    const deleted = await taskService.deleteTask(req.params.id);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send('Task not found');
    }
});

router.get('/analytics/productivity', async (req, res) => {
    const tasks = await taskService.getTasks();
    const productivity = analyticsService.calculateProductivity(tasks);
    res.json({ productivity });
});

router.get('/analytics/status', async (req, res) => {
    const tasks = await taskService.getTasks();
    const statusBreakdown = analyticsService.getTasksByStatus(tasks);
    res.json(statusBreakdown);
});

router.get('/analytics/most-productive-user', async (req, res) => {
    const tasks = await taskService.getTasks();
    const mostProductiveUser = analyticsService.getMostProductiveUser(tasks);
    res.json({ mostProductiveUser });
});

export default router;