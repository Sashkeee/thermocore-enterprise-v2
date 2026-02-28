export interface LogEntry {
    time: string;
    temp: number;
}

export const initialChartData: LogEntry[] = [
    { time: '-5m', temp: 68.2 },
    { time: '-4m', temp: 70.5 },
    { time: '-3m', temp: 72.1 },
    { time: '-2m', temp: 74.3 },
    { time: '-1m', temp: 75.0 },
    { time: 'Now', temp: 75.4 }
];

export const mockData = {
    projectName: "Thermocore Enterprise V2",
    temperature: 75.4,
    trend: "+2.1%",
    timeframe: "5m",
    status: "ALARM",
    heater: {
        state: "ON",
        power: "45%",
        active: true
    },
    pump: {
        state: "OFF",
        active: false
    },
    navigation: [
        { id: 'monitor', label: 'Monitor', icon: 'LayoutDashboard' },
        { id: 'logs', label: 'Logs', icon: 'FileText' },
        { id: 'adjust', label: 'Adjust', icon: 'Sliders' },
        { id: 'settings', label: 'Settings', icon: 'Settings' }
    ],
    pid: {
        kp: { value: 2.50, min: 0, max: 10, step: 0.1, label: "Proportional (Kp)", sublabel: "Response strength" },
        ki: { value: 0.05, min: 0, max: 1, step: 0.01, label: "Integral (Ki)", sublabel: "Steady-state error" },
        kd: { value: 1.20, min: 0, max: 5, step: 0.1, label: "Derivative (Kd)", sublabel: "Damping factor" }
    },
    systemHealth: [
        { name: 'WebSocket Stream', status: 'Connected', type: 'success' },
        { name: 'Database Logger', status: 'Active', type: 'success' },
        { name: 'Session Uptime', status: '02h 45m 12s', type: 'neutral' }
    ]
};
