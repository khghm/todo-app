import { describe, it, expect, beforeEach } from 'vitest';
import { useTodoStore } from './todoStore';

// توابع کمکی برای تست
const createTestTodo = (title: string) => ({
  title,
  completed: false,
});

describe('Todo Store', () => {
  // ریست کردن store قبل از هر تست
  beforeEach(() => {
    useTodoStore.setState({ todos: [], loading: false, error: null });
  });

  describe('addTodo', () => {
    it('should add a new todo to the store', () => {      
      // عمل: افزودن todo جدید
      useTodoStore.getState().addTodo(createTestTodo('Test Todo'));
      
      // بررسی: todo باید اضافه شده باشد
      const state = useTodoStore.getState();
      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].title).toBe('Test Todo');
      expect(state.todos[0].completed).toBe(false);
      expect(state.todos[0].id).toBeDefined();
      expect(state.todos[0].createdAt).toBeInstanceOf(Date);
    });

    it('should handle multiple todos', () => {
      useTodoStore.getState().addTodo(createTestTodo('First Todo'));
      useTodoStore.getState().addTodo(createTestTodo('Second Todo'));
      
      const state = useTodoStore.getState();
      expect(state.todos).toHaveLength(2);
      expect(state.todos[0].title).toBe('First Todo');
      expect(state.todos[1].title).toBe('Second Todo');
    });
  });

  describe('toggleTodo', () => {
    it('should toggle todo completion status', () => {
      // تنظیم اولیه: اضافه کردن یک todo
      useTodoStore.getState().addTodo(createTestTodo('Test Todo'));
      const todoId = useTodoStore.getState().todos[0].id;
      
      // عمل: toggle کردن todo
      useTodoStore.getState().toggleTodo(todoId);
      
      // بررسی: باید completed شده باشد
      let state = useTodoStore.getState();
      expect(state.todos[0].completed).toBe(true);
      
      // عمل: toggle مجدد
      useTodoStore.getState().toggleTodo(todoId);
      
      // بررسی: باید completed نشده باشد
      state = useTodoStore.getState();
      expect(state.todos[0].completed).toBe(false);
    });

    it('should not affect other todos when toggling', () => {
      // اضافه کردن چند todo
      useTodoStore.getState().addTodo(createTestTodo('First Todo'));
      useTodoStore.getState().addTodo(createTestTodo('Second Todo'));
      
      const firstTodoId = useTodoStore.getState().todos[0].id;
      
      // toggle کردن اولین todo
      useTodoStore.getState().toggleTodo(firstTodoId);
      
      const state = useTodoStore.getState();
      expect(state.todos[0].completed).toBe(true); // اولی تغییر کرده
      expect(state.todos[1].completed).toBe(false); // دومی تغییر نکرده
    });
  });

  describe('deleteTodo', () => {
    it('should remove a todo by id', () => {
      useTodoStore.getState().addTodo(createTestTodo('First Todo'));
      useTodoStore.getState().addTodo(createTestTodo('Second Todo'));
      
      const todoId = useTodoStore.getState().todos[0].id;
      const initialLength = useTodoStore.getState().todos.length;
      
      // عمل: حذف todo
      useTodoStore.getState().deleteTodo(todoId);
      
      const state = useTodoStore.getState();
      expect(state.todos).toHaveLength(initialLength - 1);
      expect(state.todos.find(todo => todo.id === todoId)).toBeUndefined();
    });
  });

  describe('clearCompleted', () => {
    it('should remove all completed todos', () => {
      // اضافه کردن todoهای مختلف
      useTodoStore.getState().addTodo(createTestTodo('Active 1'));
      useTodoStore.getState().addTodo(createTestTodo('Active 2'));
      useTodoStore.getState().addTodo(createTestTodo('Completed 1'));
      
      // complete کردن یکی از todoها
      const completedTodoId = useTodoStore.getState().todos[2].id;
      useTodoStore.getState().toggleTodo(completedTodoId);
      
      // عمل: پاک کردن completedها
      useTodoStore.getState().clearCompleted();
      
      const state = useTodoStore.getState();
      expect(state.todos).toHaveLength(2); // فقط activeها باقی بمانند
      expect(state.todos.every(todo => !todo.completed)).toBe(true);
    });
  });

  describe('updateTodo', () => {
    it('should update todo title', () => {
      useTodoStore.getState().addTodo(createTestTodo('Original Title'));
      const todoId = useTodoStore.getState().todos[0].id;
      
      // عمل: بروزرسانی عنوان
      useTodoStore.getState().updateTodo(todoId, { title: 'Updated Title' });
      
      const state = useTodoStore.getState();
      expect(state.todos[0].title).toBe('Updated Title');
      expect(state.todos[0].updatedAt).toBeInstanceOf(Date);
    });

    it('should update multiple properties', () => {
      useTodoStore.getState().addTodo(createTestTodo('Test Todo'));
      const todoId = useTodoStore.getState().todos[0].id;
      
      // عمل: بروزرسانی چند property
      useTodoStore.getState().updateTodo(todoId, { 
        title: 'New Title', 
        completed: true 
      });
      
      const state = useTodoStore.getState();
      expect(state.todos[0].title).toBe('New Title');
      expect(state.todos[0].completed).toBe(true);
    });
  });
});