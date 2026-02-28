import '@testing-library/jest-dom';

// Simple ResizeObserver mock for Recharts
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
};
