import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // اضافه کردن persist middleware
import type { Todo, CreateTodoData } from '../types/todo';

interface TodoStore {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  addTodo: (todoData: CreateTodoData) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  clearCompleted: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const generateId = (): string => {
  return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const useTodoStore = create<TodoStore>()(
  persist( // اضافه کردن persistence middleware
    (set) => ({
      todos: [],
      loading: false,
      error: null,

      addTodo: (todoData: CreateTodoData) => {
        const newTodo: Todo = {
          id: generateId(),
          title: todoData.title,
          completed: todoData.completed ?? false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state) => ({
          todos: [...state.todos, newTodo],
          error: null,
        }));
      },

      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { 
                  ...todo, 
                  completed: !todo.completed,
                  updatedAt: new Date()
                }
              : todo
          ),
        }));
      },

      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },

      updateTodo: (id: string, updates: Partial<Todo>) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { 
                  ...todo, 
                  ...updates,
                  updatedAt: new Date() 
                }
              : todo
          ),
        }));
      },

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }));
      },

      setLoading: (loading: boolean) => {
        set({ loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: 'todo-storage', // نام key در localStorage
      // skipHydration: true, // اگر نیاز به کنترل hydration داشتید
    }
  )
);