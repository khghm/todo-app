import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock کردن store برای جلوگیری از وابستگی در تست سطح بالا
vi.mock('./stores/todoStore');

describe('App Component', () => {
  it('should render the main application', () => {
    render(<App />);
    
    // بررسی عناصر اصلی UI
    expect(screen.getByText('📝 برنامه مدیریت وظایف')).toBeInTheDocument();
    expect(screen.getByText('یک برنامه حرفه‌ای برای مدیریت کارهای روزمره')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('چه کاری باید انجام بدی؟')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /افزودن وظیفه/i })).toBeInTheDocument();
  });

  it('should display the footer with technology stack', () => {
    render(<App />);
    
    expect(screen.getByText(/ساخته شده با React \+ TypeScript \+ Tailwind CSS \+ Zustand/)).toBeInTheDocument();
  });
});