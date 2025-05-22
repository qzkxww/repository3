import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateInitialTasks } from '@/utils/taskGenerator';
import { TaskType } from '@/types/task';

type TaskContextType = {
  tasks: TaskType[];
  addTask: (task: Omit<TaskType, 'id' | 'completed' | 'createdAt'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  filterTasks: (platform: string, searchQuery: string) => TaskType[];
  completedToday: () => number;
  isPremium: boolean;
  setIsPremium: (value: boolean) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  
  // Load initial tasks
  useEffect(() => {
    const initialTasks = generateInitialTasks();
    setTasks(initialTasks);
  }, []);
  
  const addTask = (task: Omit<TaskType, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: TaskType = {
      id: Date.now().toString(),
      title: task.title,
      platform: task.platform || 'Instagram',
      frequency: task.frequency || 'Daily',
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  
  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  
  const filterTasks = (platform: string, searchQuery: string) => {
    return tasks.filter((task) => {
      const matchesPlatform = platform === 'All' || task.platform === platform;
      const matchesSearch = searchQuery === '' || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesPlatform && matchesSearch;
    });
  };
  
  const completedToday = () => {
    return tasks.filter((task) => task.completed).length;
  };
  
  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        filterTasks,
        completedToday,
        isPremium,
        setIsPremium,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}