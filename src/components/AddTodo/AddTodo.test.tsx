import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddTodo } from './AddTodo';
import { useTodoStore } from '../../stores/todoStore';

// Mock کردن store
vi.mock('../../stores/todoStore');

describe('AddTodo Component', () => {
  const mockAddTodo = vi.fn();
  
  beforeEach(() => {
    // ریست کردن mocks قبل از هر تست
    vi.clearAllMocks();
    vi.mocked(useTodoStore).mockReturnValue({
      addTodo: mockAddTodo,
      // سایر properties های store که مورد نیاز است
      todos: [],
      loading: false,
      error: null,
      toggleTodo: vi.fn(),
      deleteTodo: vi.fn(),
      updateTodo: vi.fn(),
      clearCompleted: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
    });
  });

  it('should render the add todo form', () => {
    render(<AddTodo />);
    
    // بررسی وجود عناصر اصلی
    expect(screen.getByPlaceholderText('چه کاری باید انجام بدی؟')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /افزودن وظیفه/i })).toBeInTheDocument();
  });

  it('should update input value when typing', () => {
    render(<AddTodo />);
    
    const input = screen.getByPlaceholderText('چه کاری باید انجام بدی؟') as HTMLInputElement;
    
    // شبیه‌سازی تایپ کردن
    fireEvent.change(input, { target: { value: 'New Task' } });
    
    expect(input.value).toBe('New Task');
  });

  it('should call addTodo when form is submitted with valid input', () => {
    render(<AddTodo />);
    
    const input = screen.getByPlaceholderText('چه کاری باید انجام بدی؟');
    const submitButton = screen.getByRole('button', { name: /افزودن وظیفه/i });
    
    // پر کردن input و ارسال فرم
    fireEvent.change(input, { target: { value: 'Test Task' } });
    fireEvent.click(submitButton);
    
    // بررسی فراخوانی addTodo با پارامترهای صحیح
    expect(mockAddTodo).toHaveBeenCalledWith({
      title: 'Test Task',
      completed: false
    });
  });

  it('should clear input after successful submission', () => {
    render(<AddTodo />);
    
    const input = screen.getByPlaceholderText('چه کاری باید انجام بدی؟') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /افزودن وظیفه/i });
    
    fireEvent.change(input, { target: { value: 'Test Task' } });
    fireEvent.click(submitButton);
    
    // input باید پاک شده باشد
    expect(input.value).toBe('');
  });

  it('should not call addTodo when input is empty', () => {
    // Mock کردن window.alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<AddTodo />);
    
    const submitButton = screen.getByRole('button', { name: /افزودن وظیفه/i });
    
    // تلاش برای ارسال فرم با input خالی
    fireEvent.click(submitButton);
    
    // addTodo نباید فراخوانی شود
    expect(mockAddTodo).not.toHaveBeenCalled();
    // alert باید نمایش داده شود
    expect(alertMock).toHaveBeenCalledWith('لطفاً عنوان وظیفه را وارد کنید');
    
    alertMock.mockRestore();
  });

  it('should trim whitespace from input', () => {
    render(<AddTodo />);
    
    const input = screen.getByPlaceholderText('چه کاری باید انجام بدی؟');
    const submitButton = screen.getByRole('button', { name: /افزودن وظیفه/i });
    
    // اضافه کردن spaceهای اضافی
    fireEvent.change(input, { target: { value: '  Test Task  ' } });
    fireEvent.click(submitButton);
    
    // spaceهای اضافی باید trim شوند
    expect(mockAddTodo).toHaveBeenCalledWith({
      title: 'Test Task',
      completed: false
    });
  });

  it('should disable button when input is empty', () => {
    render(<AddTodo />);
    
    const submitButton = screen.getByRole('button', { name: /افزودن وظیفه/i });
    
    // دکمه باید وقتی input خالی است disabled باشد
    expect(submitButton).toBeDisabled();
    
    // پر کردن input
    const input = screen.getByPlaceholderText('چه کاری باید انجام بدی؟');
    fireEvent.change(input, { target: { value: 'Test' } });
    
    // دکمه باید enabled شود
    expect(submitButton).not.toBeDisabled();
  });
});