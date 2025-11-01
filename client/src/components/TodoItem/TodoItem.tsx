import { useState } from 'react'; // حذف React import غیرضروری
import type { Todo } from '../../types/todo'; // استفاده از type-only import
import { useTodoStore } from '../../stores/todoStore';

// تعریف props های کامپوننت
interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  // دریافت actions از store
  const { toggleTodo, deleteTodo, updateTodo } = useTodoStore();
  
  // state برای حالت ویرایش
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  // مدیریت ویرایش
  const handleEdit = () => {
    if (isEditing && editTitle.trim() !== '') {
      updateTodo(todo.id, { title: editTitle.trim() });
    }
    setIsEditing(!isEditing);
  };

  // مدیریت کلید Enter در ویرایش
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      {/* سمت چپ: چک‌باکس و عنوان */}
      <div className="flex items-center space-x-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="h-5 w-5 text-primary-500 rounded focus:ring-primary-500 border-gray-300"
          aria-label={`تیک زدن وظیفه "${todo.title}"`}
          title={`تیک زدن وظیفه "${todo.title}"`}
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleEdit}
            className="flex-1 px-2 py-1 border border-primary-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
            autoFocus
            aria-label="ویرایش عنوان وظیفه"
            title="ویرایش عنوان وظیفه"
            placeholder="عنوان وظیفه را وارد کنید"
          />
        ) : (
          <span
            className={`flex-1 text-gray-800 ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>
        )}
      </div>

      {/* سمت راست: دکمه‌های action */}
      <div className="flex items-center space-x-2 ml-4">
        <button
          onClick={handleEdit}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          title={isEditing ? 'ذخیره' : 'ویرایش'}
        >
          {isEditing ? '💾' : '✏️'}
        </button>
        
        <button
          onClick={() => deleteTodo(todo.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          title="حذف"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};