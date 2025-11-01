import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from './TodoList';
import { useTodoStore } from '../../stores/todoStore';
import type { Todo } from '../../types/todo';

// Mock کردن store
vi.mock('../../stores/todoStore');

describe('TodoList Component', () => {
  const mockClearCompleted = vi.fn();
  
  const sampleTodos: Todo[] = [
    {
      id: '1',
      title: 'Active Todo 1',
      completed: false,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      title: 'Active Todo 2',
      completed: false,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
    },
    {
      id: '3',
      title: 'Completed Todo 1',
      completed: true,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03'),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render empty state when no todos exist', () => {
    vi.mocked(useTodoStore).mockReturnValue({
      todos: [],
      clearCompleted: mockClearCompleted,
      toggleTodo: vi.fn(),
      deleteTodo: vi.fn(),
      updateTodo: vi.fn(),
      addTodo: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      loading: false,
      error: null,
    });

    render(<TodoList />);
    
    expect(screen.getByText('هیچ وظیفه‌ای ندارید!')).toBeInTheDocument();
    expect(screen.getByText('اولین وظیفه خود را بالا اضافه کنید.')).toBeInTheDocument();
  });

  it('should render todo items when todos exist', () => {
    vi.mocked(useTodoStore).mockReturnValue({
      todos: sampleTodos,
      clearCompleted: mockClearCompleted,
      toggleTodo: vi.fn(),
      deleteTodo: vi.fn(),
      updateTodo: vi.fn(),
      addTodo: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      loading: false,
      error: null,
    });

    render(<TodoList />);
    
    expect(screen.getByText('Active Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Active Todo 2')).toBeInTheDocument();
    expect(screen.getByText('Completed Todo 1')).toBeInTheDocument();
  });

  it('should show correct pending todos count', () => {
    vi.mocked(useTodoStore).mockReturnValue({
      todos: sampleTodos,
      clearCompleted: mockClearCompleted,
      toggleTodo: vi.fn(),
      deleteTodo: vi.fn(),
      updateTodo: vi.fn(),
      addTodo: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      loading: false,
      error: null,
    });

    render(<TodoList />);
    
    // باید ۲ تا todo باقی‌مانده نشان دهد (از ۳ تا، ۱ تا completed است)
    expect(screen.getByText('۲ وظیفه باقی‌مانده')).toBeInTheDocument();
  });

  it('should show clear completed button when there are completed todos', () => {
    vi.mocked(useTodoStore).mockReturnValue({
      todos: sampleTodos,
      clearCompleted: mockClearCompleted,
      toggleTodo: vi.fn(),
      deleteTodo: vi.fn(),
      updateTodo: vi.fn(),
      addTodo: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      loading: false,
      error: null,
    });

    render(<TodoList />);
    
    const clearButton = screen.getByText('پاک کردن انجام‌شده‌ها (۱)');
    expect(clearButton).toBeInTheDocument();
  });

  it('should not show clear completed button when no completed todos', () => {
    const activeTodos = sampleTodos.filter(todo => !todo.completed);
    
    vi.mocked(useTodoStore).mockReturnValue({
      todos: activeTodos,
      clearCompleted: mockClearCompleted,
      toggleTodo: vi.fn(),
      deleteTodo: vi.fn(),
      updateTodo: vi.fn(),
      addTodo: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      loading: false,
      error: null,
    });

    render(<TodoList />);
    
    expect(screen.queryByText(/پاک کردن انجام‌شده‌ها/)).not.toBeInTheDocument();
  });

  it('should call clearCompleted when clear button is clicked', () => {
    vi.mocked(useTodoStore).mockReturnValue({
      todos: sampleTodos,
      clearCompleted: mockClearCompleted,
      toggleTodo: vi.fn(),
      deleteTodo: vi.fn(),
      updateTodo: vi.fn(),
      addTodo: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      loading: false,
      error: null,
    });

    render(<TodoList />);
    
    const clearButton = screen.getByText('پاک کردن انجام‌شده‌ها (۱)');
    fireEvent.click(clearButton);
    
    expect(mockClearCompleted).toHaveBeenCalledTimes(1);
  });
});