// تعریف نوع داده برای یک وظیفه (Todo)
export interface Todo {
  id: string;           // شناسه یکتا - استفاده از string برای انعطاف بیشتر
  title: string;        // عنوان وظیفه - اجباری
  completed: boolean;   // وضعیت انجام - پیش‌فرض false
  createdAt: Date;      // تاریخ ایجاد - برای ترتیب‌دهی
  updatedAt: Date;      // تاریخ آخرین بروزرسانی - برای پیگیری تغییرات
}

// نوع برای ایجاد وظیفه جدید (بدون id و تاریخ‌ها)
// استفاده از Partial برای optional کردن completed
export type CreateTodoData = Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>> & {
  title: string; // فقط title اجباری است
};

// نوع برای بروزرسانی وظیفه (همه فیلدها اختیاری به جز id)
export type UpdateTodoData = Partial<Omit<Todo, 'id'>> & {
  id: string; // id اجباری برای شناسایی رکورد
};