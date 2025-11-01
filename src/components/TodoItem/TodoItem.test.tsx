import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from './TodoItem';
import { useTodoStore } from '../../stores/todoStore';
import type { Todo } from '../../types/todo';

// Mock کردن store
vi.mock('../../stores/todoStore');

describe('TodoItem Component', () => {
  const mockToggleTodo = vi.fn();
  const mockDeleteTodo = vi.fn();
  const mockUpdateTodo = vi.fn();
  
  const sampleTodo: Todo = {
    id: 'test-id-1',
    title: 'Test Todo Item',
    completed: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTodoStore).mockReturnValue({
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
      updateTodo: mockUpdateTodo,
      addTodo: vi.fn(),
      clearCompleted: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      todos: [],
      loading: false,
      error: null,
    });
  });

  it('should render todo item correctly', () => {
    render(<TodoItem todo={sampleTodo} />);
    
    expect(screen.getByText('Test Todo Item')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should show completed todo with line-through style', () => {
    const completedTodo: Todo = {
      ...sampleTodo,
      completed: true,
    };
    
    render(<TodoItem todo={completedTodo} />);
    
    const todoText = screen.getByText('Test Todo Item');
    expect(todoText).toHaveClass('line-through');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should call toggleTodo when checkbox is clicked', () => {
    render(<TodoItem todo={sampleTodo} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockToggleTodo).toHaveBeenCalledWith('test-id-1');
  });

  it('should call deleteTodo when delete button is clicked', () => {
    render(<TodoItem todo={sampleTodo} />);
    
    const deleteButton = screen.getByTitle('حذف');
    fireEvent.click(deleteButton);
    
    expect(mockDeleteTodo).toHaveBeenCalledWith('test-id-1');
  });

  it('should enter edit mode on double click', () => {
    render(<TodoItem todo={sampleTodo} />);
    
    const todoText = screen.getByText('Test Todo Item');
    fireEvent.doubleClick(todoText);
    
    expect(screen.getByDisplayValue('Test Todo Item')).toBeInTheDocument();
    expect(screen.queryByText('Test Todo Item')).not.toBeInTheDocument();
  });

  it('should update todo when editing is completed', async () => {
    render(<TodoItem todo={sampleTodo} />);
    
    // وارد کردن حالت ویرایش
    const todoText = screen.getByText('Test Todo Item');
    fireEvent.doubleClick(todoText);
    
    // ویرایش متن
    const input = screen.getByDisplayValue('Test Todo Item');
    fireEvent.change(input, { target: { value: 'Updated Todo' } });
    
    // خروج از حالت ویرایش
    fireEvent.blur(input);
    
    expect(mockUpdateTodo).toHaveBeenCalledWith('test-id-1', {
      title: 'Updated Todo'
    });
  });

  it('should save on Enter key press', () => {
    render(<TodoItem todo={sampleTodo} />);
    
    // وارد کردن حالت ویرایش
    const todoText = screen.getByText('Test Todo Item');
    fireEvent.doubleClick(todoText);
    
    // ویرایش و فشار دادن Enter
    const input = screen.getByDisplayValue('Test Todo Item');
    fireEvent.change(input, { target: { value: 'Updated Todo' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(mockUpdateTodo).toHaveBeenCalledWith('test-id-1', {
      title: 'Updated Todo'
    });
  });

  it('should cancel edit on Escape key press', () => {
    render(<TodoItem todo={sampleTodo} />);
    
    // وارد کردن حالت ویرایش
    const todoText = screen.getByText('Test Todo Item');
    fireEvent.doubleClick(todoText);
    
    // ویرایش و فشار دادن Escape
    const input = screen.getByDisplayValue('Test Todo Item');
    fireEvent.change(input, { target: { value: 'Updated Todo' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    
    // باید به حالت عادی برگردد بدون فراخوانی updateTodo
    expect(mockUpdateTodo).not.toHaveBeenCalled();
    expect(screen.getByText('Test Todo Item')).toBeInTheDocument();
  });

  it('should not save empty title', () => {
    render(<TodoItem todo={sampleTodo} />);
    
    // وارد کردن حالت ویرایش
    const todoText = screen.getByText('Test Todo Item');
    fireEvent.doubleClick(todoText);
    
    // پاک کردن متن
    const input = screen.getByDisplayValue('Test Todo Item');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.blur(input);
    
    // نباید updateTodo فراخوانی شود
    expect(mockUpdateTodo).not.toHaveBeenCalled();
  });
});