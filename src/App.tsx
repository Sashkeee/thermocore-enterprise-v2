import {
  LayoutDashboard, FileText, Settings2, Cpu,
  Flame, Droplets, TriangleAlert, TrendingUp,
  MoveLeft, Info, Power, Moon, Sun,
  RefreshCcw, Settings, ShieldCheck, Gauge, Share2, MoreHorizontal
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { mockData, initialChartData } from './data/mockData';
import type { LogEntry } from './data/mockData';

/** Utility for class merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type Screen = 'monitor' | 'setup' | 'logs' | 'config';

interface ControlState {
  heater: { active: boolean; power: string };
  pump: { active: boolean };
}

// --- Sub-Components ---

const Header = ({
  title,
  subtitle,
  showBack,
  onBack,
  theme,
  toggleTheme
}: {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}) => (
  <header className="flex items-center justify-between px-6 pt-10 pb-6 sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-40 border-b border-app-border">
    <div className="flex items-center gap-4">
      {showBack && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="p-2 -ml-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-primary transition-colors"
        >
          <MoveLeft className="w-5 h-5" />
        </motion.button>
      )}
      <div className="flex flex-col">
        <h1 className="text-sm font-black tracking-[0.1em] text-app-main uppercase font-display">{title}</h1>
        {subtitle && <span className="text-[10px] font-bold text-app-muted tracking-wider flex items-center gap-1.5 uppercase">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> {subtitle}
        </span>}
      </div>
    </div>
    <div className="flex items-center gap-2">
      <motion.button
        id="theme-toggle"
        data-testid="theme-toggle"
        whileTap={{ rotate: 180 }}
        onClick={toggleTheme}
        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary transition-all border border-app-border shadow-sm"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </motion.button>
    </div>
  </header>
);

const Navigation = ({ current, setScreen }: { current: Screen; setScreen: (s: Screen) => void }) => (
  <nav className="fixed bottom-0 left-0 right-0 border-t border-app-border bg-app-surface px-4 pb-8 pt-3 z-50 max-w-md mx-auto shadow-2xl">
    <div className="flex items-center justify-around">
      {[
        { id: 'monitor', label: 'Monitor', icon: LayoutDashboard },
        { id: 'logs', label: 'Reports', icon: FileText },
        { id: 'setup', label: 'Tuning', icon: Cpu },
        { id: 'config', label: 'System', icon: Settings },
      ].map((item) => {
        const isActive = current === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            data-testid={`nav-${item.id}`}
            onClick={() => setScreen(item.id as Screen)}
            className={cn(
              "group flex flex-col items-center gap-1.5 transition-all duration-300 relative py-2 w-16",
              isActive ? "text-primary scale-105" : "text-app-muted hover:text-primary"
            )}
          >
            <div className={cn(
              "p-1 rounded-lg transition-colors",
              isActive && "bg-primary/5 text-primary"
            )}>
              <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
            </div>
            <span className={cn("text-[9px] font-bold tracking-widest uppercase", !isActive && "opacity-50")}>{item.label}</span>
            {isActive && (
              <motion.div
                layoutId="navIndicator"
                className="absolute -top-3 w-10 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(43,108,238,0.5)]"
              />
            )}
          </button>
        );
      })}
    </div>
  </nav>
);

// --- Screen Components ---

const MonitorScreen = ({ controls, setControls }: { controls: ControlState; setControls: React.Dispatch<React.SetStateAction<ControlState>> }) => {
  const [chartData, setChartData] = useState(initialChartData);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const last = prev[prev.length - 1];
        const nextTemp = +(last.temp + (Math.random() - 0.45) * 0.4).toFixed(1);
        return [...prev.slice(1), { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), temp: nextTemp }];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-5 px-6 pb-28 pt-4">
      <section className="bg-slate-900 dark:bg-slate-950 rounded-[2.5rem] p-10 text-white relative shadow-2xl overflow-hidden border border-white/5">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-md">
              <Gauge className="w-5 h-5 text-primary" />
            </div>
            <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ring-1 ring-emerald-500/30">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> STABLE
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white/40 text-[10px] font-black tracking-[0.2em] mb-1 uppercase">Thermal Core Temp</span>
            <div className="flex items-baseline gap-2">
              <h2 className="text-8xl font-black font-display tracking-tight text-white leading-none">
                {chartData[chartData.length - 1].temp}
              </h2>
              <span className="text-3xl font-bold text-white/30">°C</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      </section>

      <section className="bg-app-surface border border-app-border rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6 text-app-main">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-app-muted">Response Trend</h3>
          <MoreHorizontal className="w-4 h-4" />
        </div>
        <div className="h-40 w-full ml-[-15px]">
          <ResponsiveContainer width="110%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="primaryGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2b6cee" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2b6cee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" hide />
              <Area type="monotone" dataKey="temp" stroke="#2b6cee" strokeWidth={3} fillOpacity={1} fill="url(#primaryGrad)" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileTap={{ scale: 0.96 }}
          data-testid="toggle-heater"
          onClick={() => setControls(prev => ({ ...prev, heater: { ...prev.heater, active: !prev.heater.active } }))}
          className={cn(
            "group flex flex-col p-6 rounded-3xl border-2 transition-all duration-300 text-left",
            controls.heater.active ? "bg-primary border-primary text-white" : "bg-app-surface border-app-border text-app-main grayscale opacity-60"
          )}
        >
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", controls.heater.active ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500")}>
            <Flame className={cn("w-6 h-6", controls.heater.active && "fill-white")} />
          </div>
          <div className="font-black text-xs uppercase tracking-widest mb-1">Heater</div>
          <div className="text-[10px] font-bold uppercase opacity-60">{controls.heater.active ? controls.heater.power : "OFF"}</div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          data-testid="toggle-pump"
          onClick={() => setControls(prev => ({ ...prev, pump: { active: !prev.pump.active } }))}
          className={cn(
            "group flex flex-col p-6 rounded-3xl border-2 transition-all duration-300 text-left",
            controls.pump.active ? "bg-orange-500 border-orange-500 text-white" : "bg-app-surface border-app-border text-app-main grayscale opacity-60"
          )}
        >
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", controls.pump.active ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500")}>
            <Droplets className="w-6 h-6" />
          </div>
          <div className="font-black text-xs uppercase tracking-widest mb-1">Pump</div>
          <div className="text-[10px] font-bold uppercase opacity-60">{controls.pump.active ? "ACTIVE" : "OFF"}</div>
        </motion.button>
      </div>
    </motion.div>
  );
};

const LogsScreen = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4 px-6 pb-28 pt-4">
    <h2 className="text-xl font-black font-display uppercase tracking-widest text-app-main">Reports</h2>
    <div className="space-y-3">
      {mockData.logs.map((log: LogEntry) => (
        <div key={log.id} className="bg-app-surface p-5 rounded-3xl border border-app-border flex gap-5 items-center">
          <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shrink-0", log.type === 'alert' ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary')}>
            {log.type === 'alert' ? <TriangleAlert className="w-5 h-5" /> : <Info className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-black text-app-muted uppercase">{log.time}</span>
            <p className="text-sm font-bold text-app-main leading-tight">{log.msg}</p>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const SetupScreen = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6 px-6 pb-28 pt-4">
    <h2 className="text-xl font-black font-display uppercase tracking-widest text-app-main">Tuning</h2>
    <div className="space-y-4">
      {Object.entries(mockData.pid).map(([key, p]) => (
        <div key={key} className="bg-app-surface rounded-3xl p-6 border border-app-border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-black text-app-main uppercase">{p.label}</span>
            <span className="text-2xl font-black font-display text-primary">{p.value.toFixed(2)}</span>
          </div>
          <input type="range" className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-primary cursor-pointer" />
        </div>
      ))}
    </div>
    <motion.button whileTap={{ scale: 0.98 }} className="w-full h-14 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl">Apply Parameters</motion.button>
  </motion.div>
);

const ConfigScreen = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6 px-6 pb-28 pt-4">
    <h2 className="text-xl font-black font-display uppercase tracking-widest text-app-main">System</h2>
    <div className="bg-app-surface rounded-3xl border border-app-border divide-y divide-app-border overflow-hidden shadow-sm">
      <div className="p-6 flex items-center justify-between">
        <span className="text-sm font-bold text-app-main">Cloud Encryption</span>
        <ShieldCheck className="w-5 h-5 text-emerald-500" />
      </div>
      <div className="p-6 flex items-center justify-between text-red-500 cursor-pointer">
        <span className="text-sm font-bold">Safe Shutdown</span>
        <Power className="w-5 h-5" />
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [screen, setScreen] = useState<Screen>('monitor');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'dark';
  });

  const [controls, setControls] = useState<ControlState>({
    heater: { active: true, power: "45%" },
    pump: { active: true }
  });

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    // Initial sync
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto bg-app-bg border-x border-app-border shadow-2xl">
        <Header
          title={screen === 'monitor' ? 'Monitor' : screen}
          subtitle="Enterprise Guard v3"
          showBack={screen !== 'monitor'}
          onBack={() => setScreen('monitor')}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <main className="flex-1 overflow-y-auto no-scrollbar">
          <AnimatePresence mode="wait">
            {screen === 'monitor' && <MonitorScreen key="mon" controls={controls} setControls={setControls} />}
            {screen === 'setup' && <SetupScreen key="adj" />}
            {screen === 'logs' && <LogsScreen key="log" />}
            {screen === 'config' && <ConfigScreen key="set" />}
          </AnimatePresence>
        </main>
        <Navigation current={screen} setScreen={setScreen} />
      </div>
    </div>
  );
}
