import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'done';
    assignee: string;
    dueDate: Date;
    tags: string[];
}

async function createTask(task: Omit<Task, 'id'>): Promise<Task> {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
}

async function getTasks(): Promise<Task[]> {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
}

async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const response = await axios.put(`${API_URL}/tasks/${id}`, updates);
    return response.data;
}

async function deleteTask(id: string): Promise<boolean> {
    const response = await axios.delete(`${API_URL}/tasks/${id}`);
    return response.status === 204;
}

async function getProductivity(): Promise<number> {
    const response = await axios.get(`${API_URL}/analytics/productivity`);
    return response.data.productivity;
}

async function getTasksByStatus(): Promise<Record<Task['status'], number>> {
    const response = await axios.get(`${API_URL}/analytics/status`);
    return response.data;
}

async function getMostProductiveUser(): Promise<string | null> {
    const response = await axios.get(`${API_URL}/analytics/most-productive-user`);
    return response.data.mostProductiveUser;
}

async function main() {
    try {
        // Create tasks
        console.log("Creating tasks...");
        const task1 = await createTask({
            title: "Implement user authentication",
            description: "Add JWT-based authentication to the API",
            status: "todo",
            assignee: "Alice",
            dueDate: new Date("2024-11-15"),
            tags: ["backend", "security"]
        });
        console.log("Task created:", task1);

        const task2 = await createTask({
            title: "Design new dashboard",
            description: "Create mockups for the analytics dashboard",
            status: "in-progress",
            assignee: "Bob",
            dueDate: new Date("2024-11-10"),
            tags: ["frontend", "design"]
        });
        console.log("Task created:", task2);

        // Get all tasks
        console.log("\nFetching all tasks...");
        const allTasks = await getTasks();
        console.log("All tasks:", allTasks);

        // Update a task
        console.log("\nUpdating a task...");
        const updatedTask = await updateTask(task1.id, { status: "in-progress" });
        console.log("Updated task:", updatedTask);

        // Delete a task
        console.log("\nDeleting a task...");
        const deleted = await deleteTask(task2.id);
        console.log("Task deleted:", deleted);

        // Get productivity
        console.log("\nFetching productivity...");
        const productivity = await getProductivity();
        console.log("Current productivity:", productivity);

        // Get tasks by status
        console.log("\nFetching tasks by status...");
        const tasksByStatus = await getTasksByStatus();
        console.log("Tasks by status:", tasksByStatus);

        // Get most productive user
        console.log("\nFetching most productive user...");
        const mostProductiveUser = await getMostProductiveUser();
        console.log("Most productive user:", mostProductiveUser);

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();