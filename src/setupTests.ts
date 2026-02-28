import '@testing-library/jest-dom';

// Simple ResizeObserver mock for Recharts
class ResizeObserverMock {
    observe() { }
    unobserve() { }
    disconnect() { }
}

window.ResizeObserver = ResizeObserverMock;
(globalThis as any).ResizeObserver = ResizeObserverMock;
