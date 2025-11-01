import React from 'react';
import { useTodoStore } from '../../stores/todoStore';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { todos, clearCompleted } = useTodoStore();

  // محاسبه آمار
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  // اگر هیچ todoای وجود ندارد
  if (totalTodos === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">هیچ وظیفه‌ای ندارید!</h3>
        <p className="text-gray-500">اولین وظیفه خود را بالا اضافه کنید.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* هدر با آمار */}
      <div className="flex justify-between items-center bg-primary-50 p-4 rounded-lg">
        <div className="text-sm text-primary-700">
          <span className="font-medium">{pendingTodos}</span> وظیفه باقی‌مانده
        </div>
        
        {completedTodos > 0 && (
          <button
            onClick={clearCompleted}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            پاک کردن انجام‌شده‌ها ({completedTodos})
          </button>
        )}
      </div>

      {/* لیست todos */}
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>

      {/* فوتر اطلاعات */}
      <div className="text-xs text-gray-500 text-center pt-4 border-t border-gray-200">
        برای ویرایش روی عنوان دوبار کلیک کنید • برای حذف روی آیکون سطل زباله کلیک کنید
      </div>
    </div>
  );
};