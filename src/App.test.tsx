import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Thermocore Enterprise Hub', () => {
    it('renders the monitor dashboard by default', () => {
        render(<App />);
        // В новой версии заголовок MONITRO (uppercase)
        expect(screen.getByText(/MONITOR/i)).toBeInTheDocument();
        expect(screen.getByText(/Thermal Core Temp/i)).toBeInTheDocument();
    });

    it('toggles theme correctly', () => {
        render(<App />);
        const toggle = screen.getByTestId('theme-toggle');
        const html = document.documentElement;

        // Проверяем смену класса dark на html теге
        const isInitiallyDark = html.classList.contains('dark');
        fireEvent.click(toggle);
        expect(html.classList.contains('dark')).not.toBe(isInitiallyDark);

        // Переключаем обратно
        fireEvent.click(toggle);
        expect(html.classList.contains('dark')).toBe(isInitiallyDark);
    });

    it('navigates to tuning (setup) screen', () => {
        render(<App />);
        const navSetup = screen.getByTestId('nav-setup');
        fireEvent.click(navSetup);

        // В новой версии заголовок Tuning в h2
        expect(screen.getByText(/TUNING/i)).toBeInTheDocument();
    });

    it('toggles heater component state', () => {
        render(<App />);
        const heaterBtn = screen.getByTestId('toggle-heater');

        // Проверяем наличие текста мощности
        expect(screen.getByText(/45%/i)).toBeInTheDocument();

        fireEvent.click(heaterBtn);

        // После выключения должен быть текст OFF (или IDLE в зависимости от верстки)
        expect(screen.getByText(/OFF/i)).toBeInTheDocument();
    });
});
