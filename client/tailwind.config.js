/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // سفارشی‌سازی تم برای برنامه حرفه‌ای
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // برای استایل‌دهی بهتر فرم‌ها
  ],
}