"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TaskService_1 = require("../services/TaskService");
const AnalyticsService_1 = require("../services/AnalyticsService");
const router = express_1.default.Router();
const taskService = new TaskService_1.TaskService();
const analyticsService = new AnalyticsService_1.AnalyticsService();
router.post('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield taskService.createTask(req.body);
    res.status(201).json(task);
}));
router.get('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield taskService.getTasks();
    res.json(tasks);
}));
router.put('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTask = yield taskService.updateTask(req.params.id, req.body);
    if (updatedTask) {
        res.json(updatedTask);
    }
    else {
        res.status(404).send('Task not found');
    }
}));
router.delete('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield taskService.deleteTask(req.params.id);
    if (deleted) {
        res.status(204).send();
    }
    else {
        res.status(404).send('Task not found');
    }
}));
router.get('/analytics/productivity', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield taskService.getTasks();
    const productivity = analyticsService.calculateProductivity(tasks);
    res.json({ productivity });
}));
router.get('/analytics/status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield taskService.getTasks();
    const statusBreakdown = analyticsService.getTasksByStatus(tasks);
    res.json(statusBreakdown);
}));
router.get('/analytics/most-productive-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield taskService.getTasks();
    const mostProductiveUser = analyticsService.getMostProductiveUser(tasks);
    res.json({ mostProductiveUser });
}));
exports.default = router;
