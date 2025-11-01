import { useState } from 'react'; // حذف React import غیرضروری
import { useTodoStore } from '../../stores/todoStore';

export const AddTodo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { addTodo } = useTodoStore();

  // مدیریت ارسال فرم
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // جلوگیری از reload صفحه
    
    const trimmedValue = inputValue.trim();
    
    // اعتبارسنجی: عنوان نباید خالی باشد
    if (trimmedValue === '') {
      alert('لطفاً عنوان وظیفه را وارد کنید');
      return;
    }

    // افزودن todo جدید - حالا با نوع درست
    addTodo({ 
      title: trimmedValue,
      completed: false // مشخص کردن مقدار completed
    });
    
    // پاک کردن input پس از افزودن
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex space-x-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="چه کاری باید انجام بدی؟"
          className="input-field flex-1"
          maxLength={100} // محدودیت تعداد کاراکتر
        />
        <button
          type="submit"
          className="btn-primary whitespace-nowrap"
          disabled={!inputValue.trim()} // غیرفعال کردن اگر input خالی است
        >
          افزودن وظیفه
        </button>
      </div>
      
      {/* نمایش تعداد کاراکتر باقی‌مانده */}
      <div className="text-xs text-gray-500 mt-1 text-left">
        {inputValue.length}/100 کاراکتر
      </div>
    </form>
  );
};