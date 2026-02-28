export type LogEntry = {
    id: string;
    time: string;
    temp: number;
    type: 'info' | 'warning' | 'alert' | 'system';
    msg: string;
};

export const initialChartData = [
    { time: '08:00', temp: 68.2 },
    { time: '09:00', temp: 70.5 },
    { time: '10:00', temp: 72.1 },
    { time: '11:00', temp: 74.3 },
    { time: '12:00', temp: 75.0 },
    { time: '13:00', temp: 75.4 }
];

export const mockData = {
    projectName: "Thermocore Control v3",
    temperature: 75.4,
    trend: "+2.1%",
    timeframe: "Last Hour",
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
        { id: 'setup', label: 'Tuning', icon: 'Settings2' },
        { id: 'config', label: 'System', icon: 'Trello' }
    ],
    pid: {
        kp: { value: 2.50, min: 0, max: 10, step: 0.1, label: "Gain (Kp)", sublabel: "Response strength" },
        ki: { value: 0.05, min: 0, max: 1, step: 0.01, label: "Integral (Ki)", sublabel: "Steady-state error" },
        kd: { value: 1.20, min: 0, max: 5, step: 0.1, label: "Derivative (Kd)", sublabel: "Damping factor" }
    },
    logs: [
        { id: '1', time: '14:20:15', temp: 75.4, type: 'alert', msg: 'Secondary Threshold Exceeded' },
        { id: '2', time: '14:18:02', temp: 74.8, type: 'info', msg: 'Manual Heater Override' },
        { id: '3', time: '14:10:45', temp: 73.2, type: 'system', msg: 'PID Self-Optimization Sync' },
        { id: '4', time: '13:55:12', temp: 72.1, type: 'warning', msg: 'Low Coolant Flow Detected' },
        { id: '5', time: '13:40:00', temp: 70.5, type: 'info', msg: 'System Routine Boot Sequence' }
    ] as LogEntry[],
    config: {
        units: 'Celsius (°C)',
        notifications: true,
        autoTune: false,
        refreshRate: '1s',
        cloudSync: true
    }
};
