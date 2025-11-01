import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // استفاده از globals به جای import
    environment: 'jsdom', // محیط مرورگر برای تست کامپوننت‌های React
    setupFiles: './src/__tests__/setup.ts', // فایل setup برای تست‌ها
    css: true, // پردازش CSS در تست‌ها
    coverage: {
      reporter: ['text', 'json', 'html'], // گزارش coverage
      exclude: ['node_modules/', 'src/__tests__/'], // فایل‌های مستثنی
    },
  },
});