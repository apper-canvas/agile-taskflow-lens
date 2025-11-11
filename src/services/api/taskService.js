import taskData from "@/services/mockData/tasks.json";

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage key
const STORAGE_KEY = "taskflow_tasks";

// Load tasks from localStorage or use mock data
const loadTasks = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.warn("Failed to parse stored tasks, using mock data");
    }
  }
  return [...taskData];
};

// Save tasks to localStorage
const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const getAll = async () => {
  await delay(300);
  return loadTasks();
};

export const getById = async (id) => {
  await delay(200);
  const tasks = loadTasks();
  const task = tasks.find(t => t.Id === parseInt(id));
  if (!task) {
    throw new Error(`Task with Id ${id} not found`);
  }
  return { ...task };
};

export const create = async (taskData) => {
  await delay(400);
  const tasks = loadTasks();
  
  // Find highest existing Id and add 1
  const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
  
  const newTask = {
    Id: maxId + 1,
    title: taskData.title,
    description: taskData.description || "",
    priority: taskData.priority || "medium",
    dueDate: taskData.dueDate,
    completed: false,
    listId: taskData.listId || "default",
    createdAt: new Date().toISOString(),
    completedAt: null
  };
  
  const updatedTasks = [newTask, ...tasks];
  saveTasks(updatedTasks);
  
  return { ...newTask };
};

export const update = async (id, updateData) => {
  await delay(300);
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex(t => t.Id === parseInt(id));
  
  if (taskIndex === -1) {
    throw new Error(`Task with Id ${id} not found`);
  }
  
  const existingTask = tasks[taskIndex];
  const updatedTask = {
    ...existingTask,
    ...updateData,
    Id: existingTask.Id // Ensure Id doesn't change
  };
  
  tasks[taskIndex] = updatedTask;
  saveTasks(tasks);
  
  return { ...updatedTask };
};

export const delete_ = async (id) => {
  await delay(250);
  const tasks = loadTasks();
  const filteredTasks = tasks.filter(t => t.Id !== parseInt(id));
  
  if (filteredTasks.length === tasks.length) {
    throw new Error(`Task with Id ${id} not found`);
  }
  
saveTasks(filteredTasks);
  return true;
};

// Export delete_ as the main delete function (delete is a reserved keyword)
export { delete_ as delete };