// حذف import React غیرضروری
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* هدر برنامه */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 برنامه مدیریت وظایف
          </h1>
          <p className="text-gray-600">
            یک برنامه حرفه‌ای برای مدیریت کارهای روزمره
          </p>
        </header>

        {/* محتوای اصلی */}
        <main className="bg-white rounded-2xl shadow-xl p-6">
          <AddTodo />
          <TodoList />
        </main>

        {/* فوتر */}
        <footer className="text-center mt-8 text-gray-500 text-sm">
          ساخته شده با React + TypeScript + Tailwind CSS + Zustand
        </footer>
      </div>
    </div>
  );
}

export default App;