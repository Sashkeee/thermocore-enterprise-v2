import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Thermocore Enterprise Hub', () => {
    it('renders the monitor dashboard by default', () => {
        render(<App />);
        // Use getAllByText because Monitor appears in Header and Navigation
        const titles = screen.getAllByText(/MONITOR/i);
        expect(titles.length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(/Thermal Core Temp/i)).toBeInTheDocument();
    });

    it('toggles theme correctly', () => {
        render(<App />);
        const toggle = screen.getByTestId('theme-toggle');
        const html = document.documentElement;

        const isInitiallyDark = html.classList.contains('dark');
        fireEvent.click(toggle);
        expect(html.classList.contains('dark')).not.toBe(isInitiallyDark);

        fireEvent.click(toggle);
        expect(html.classList.contains('dark')).toBe(isInitiallyDark);
    });

    it('navigates to tuning (setup) screen', () => {
        render(<App />);
        const navSetup = screen.getByTestId('nav-setup');
        fireEvent.click(navSetup);

        // Tuning appears in Header and possibly content
        const tuningElements = screen.getAllByText(/TUNING/i);
        expect(tuningElements.length).toBeGreaterThanOrEqual(1);
    });

    it('toggles heater component state', () => {
        render(<App />);
        const heaterBtn = screen.getByTestId('toggle-heater');

        expect(screen.getByText(/45%/i)).toBeInTheDocument();

        fireEvent.click(heaterBtn);

        expect(screen.getByText(/OFF/i)).toBeInTheDocument();
    });
});
