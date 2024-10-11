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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
class TaskService {
    constructor() {
        this.tasks = [];
    }
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTask = Object.assign(Object.assign({}, task), { id: Date.now().toString() });
            this.tasks.push(newTask);
            return newTask;
        });
    }
    getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tasks;
        });
    }
    updateTask(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskIndex = this.tasks.findIndex(task => task.id === id);
            if (taskIndex === -1)
                return null;
            this.tasks[taskIndex] = Object.assign(Object.assign({}, this.tasks[taskIndex]), updates);
            return this.tasks[taskIndex];
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const initialLength = this.tasks.length;
            this.tasks = this.tasks.filter(task => task.id !== id);
            return this.tasks.length < initialLength;
        });
    }
}
exports.TaskService = TaskService;
