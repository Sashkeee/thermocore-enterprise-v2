import { Thermometer, Bell, LayoutDashboard, FileText, Sliders, Settings, Flame, Droplets, TriangleAlert, TrendingUp, FunctionSquare, LineChart, MoveLeft, Save, Hand, HeartPulse, CloudSync, Database, Timer, Info, Power } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockData, initialChartData } from './data/mockData';

/** Utility for class merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type Screen = 'monitor' | 'adjust' | 'logs' | 'settings';

interface ControlState {
  heater: { active: boolean; power: string };
  pump: { active: boolean };
}

// --- Sub-Components ---

const Header = ({ title, showBack, onBack, rightAction }: { title: string; showBack?: boolean; onBack?: () => void; rightAction?: React.ReactNode }) => (
  <header className="flex items-center justify-between px-6 pt-12 pb-4 bg-background-light dark:bg-background-dark/95 backdrop-blur-sm z-30 sticky top-0 transition-all border-b border-transparent">
    <div className="flex items-center gap-3">
      {showBack && (
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
          <MoveLeft className="w-6 h-6" />
        </button>
      )}
      {!showBack && <Thermometer className="text-primary w-8 h-8" />}
      <h1 className="text-xl font-bold tracking-tight font-display">{title}</h1>
    </div>
    {rightAction || (
      <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
        <Bell className="text-slate-500 dark:text-slate-400 w-6 h-6" />
      </button>
    )}
  </header>
);

const Navigation = ({ current, setScreen }: { current: Screen; setScreen: (s: Screen) => void }) => (
  <nav className="fixed bottom-0 left-0 right-0 border-t border-surface-border bg-surface-dark/95 backdrop-blur-md px-6 pb-8 pt-4 z-40 max-w-md mx-auto">
    <div className="flex items-center justify-between">
      {mockData.navigation.map((item) => {
        const isActive = current === item.id;
        const Icon = { LayoutDashboard, FileText, Sliders, Settings }[item.icon] || LayoutDashboard;
        return (
          <button
            key={item.id}
            onClick={() => setScreen(item.id as Screen)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all",
              isActive ? "text-primary scale-110" : "text-slate-500 hover:text-slate-300"
            )}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
          </button>
        );
      })}
    </div>
  </nav>
);

// --- Main Screens ---

const MonitorScreen = ({ controls, setControls }: { controls: ControlState; setControls: React.Dispatch<React.SetStateAction<ControlState>> }) => {
  const [chartData, setChartData] = useState(initialChartData);

  // Simulation: Dynamic Chart
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const last = prev[prev.length - 1];
        const nextTemp = +(last.temp + (Math.random() - 0.45) * 1.5).toFixed(1);
        return [...prev.slice(1), { time: 'Now', temp: nextTemp }];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col gap-6 px-6 pb-24 overflow-y-auto no-scrollbar">
      {/* Temperature Readout Section */}
      <section className="relative flex flex-col items-center justify-center py-8 rounded-3xl bg-surface-dark border border-surface-border shadow-inner-glow overflow-hidden">
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 animate-pulse">
          <TriangleAlert className="text-red-500 w-4 h-4" />
          <span className="text-xs font-bold text-red-500 tracking-wider font-display uppercase">{mockData.status}</span>
        </div>
        <div className="flex flex-col items-center mt-4">
          <span className="text-slate-400 text-sm font-medium tracking-widest uppercase mb-1">Current Temp</span>
          <div className="relative">
            <h2 className="text-7xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 tracking-tighter">
              {chartData[chartData.length - 1].temp}<span className="text-4xl align-top text-slate-500 ml-1">°C</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-sm text-green-500 font-medium">{mockData.trend} ({mockData.timeframe})</span>
          </div>
        </div>
        <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle at center, rgba(43, 108, 238, 0.15) 0%, transparent 70%)' }}></div>
      </section>

      {/* Chart Section - Real Recharts Chart */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Live Trend</h3>
          <button className="text-xs text-primary font-medium hover:text-blue-400 transition-colors underline-offset-4 hover:underline">Full History</button>
        </div>
        <div className="w-full h-48 bg-surface-dark rounded-2xl border border-surface-border py-4 pr-4 pl-0 relative overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2b6cee" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2b6cee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#232f48" opacity={0.3} />
              <XAxis dataKey="time" hide />
              <YAxis domain={['auto', 'auto']} hide />
              <Tooltip
                contentStyle={{ backgroundColor: '#192233', border: '1px solid #232f48', borderRadius: '8px', fontSize: '10px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="temp" stroke="#2b6cee" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" animationDuration={1000} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Controls Section */}
      <section className="grid grid-cols-2 gap-4">
        {/* Heater Button with Toggle Logic */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setControls(prev => ({ ...prev, heater: { ...prev.heater, active: !prev.heater.active } }))}
          className={cn(
            "group relative flex flex-col items-center justify-center h-32 rounded-2xl transition-all duration-300",
            controls.heater.active ? "bg-amber-500/10 border border-amber-500/30 shadow-glow-amber" : "bg-surface-dark border border-surface-border"
          )}
        >
          {controls.heater.active && <motion.div layoutId="glow" className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent rounded-2xl opacity-50" />}
          <div className={cn(
            "h-12 w-12 rounded-full flex items-center justify-center mb-3 transition-colors duration-300",
            controls.heater.active ? "bg-amber-500/20 text-amber-500" : "bg-surface-border text-slate-500"
          )}>
            <Flame className={cn("w-7 h-7 transition-all", controls.heater.active && "fill-amber-500 scale-110")} />
          </div>
          <span className={cn("font-bold tracking-wide z-10 transition-colors", controls.heater.active ? "text-amber-500" : "text-slate-400")}>HEATER</span>
          <span className={cn("text-xs font-mono mt-1 z-10 opacity-60")}>{controls.heater.active ? 'ON' : 'OFF'} - {controls.heater.power}</span>
          {controls.heater.active && <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-amber-500 animate-pulse" />}
        </motion.button>

        {/* Pump Button with Toggle Logic */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setControls(prev => ({ ...prev, pump: { active: !prev.pump.active } }))}
          className={cn(
            "group relative flex flex-col items-center justify-center h-32 rounded-2xl transition-all duration-300",
            controls.pump.active ? "bg-cyan-500/10 border border-cyan-500/30 shadow-glow-cyan" : "bg-surface-dark border border-surface-border"
          )}
        >
          <div className={cn(
            "h-12 w-12 rounded-full flex items-center justify-center mb-3 transition-colors duration-300",
            controls.pump.active ? "bg-cyan-500/20 text-cyan-500" : "bg-surface-border text-slate-400 group-hover:text-cyan-400"
          )}>
            <Droplets className={cn("w-7 h-7 transition-all", controls.pump.active && "scale-110")} />
          </div>
          <span className={cn("font-bold tracking-wide transition-colors", controls.pump.active ? "text-cyan-500" : "text-slate-400")}>PUMP</span>
          <span className={cn("text-xs font-mono mt-1 opacity-60")}>{controls.pump.active ? 'ON' : 'OFF'}</span>
        </motion.button>
      </section>
    </motion.div>
  );
};

const AdjustScreen = () => {
  const [params, setParams] = useState(mockData.pid);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6 px-6 pb-24 overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Sliders className="w-5 h-5 text-primary" />
          PID Parameters
        </h2>
        <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded">AUTO-TUNE: OFF</span>
      </div>

      <div className="space-y-4">
        {Object.entries(params).map(([key, p], i) => {
          const Icon = [TrendingUp, FunctionSquare, LineChart][i] || Sliders;
          const accentColor = ['text-blue-500', 'text-purple-500', 'text-teal-500'][i];
          const bgAccent = ['bg-blue-500/10', 'bg-purple-500/10', 'bg-teal-500/10'][i];
          const rangeAccent = ['accent-blue-500', 'accent-purple-500', 'accent-teal-500'][i];

          return (
            <div key={key} className="bg-surface-dark rounded-xl p-4 border border-surface-border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", bgAccent, accentColor)}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{p.label}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{p.sublabel}</p>
                  </div>
                </div>
                <div className={cn("text-2xl font-mono font-bold", accentColor)}>{p.value.toFixed(2)}</div>
              </div>
              <input
                type="range"
                min={p.min} max={p.max} step={p.step}
                value={p.value}
                onChange={(e) => setParams(prev => ({ ...prev, [key]: { ...prev[key as keyof typeof params], value: parseFloat(e.target.value) } }))}
                className={cn("w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer", rangeAccent)}
              />
            </div>
          );
        })}
      </div>

      {/* Manual Overrides from Design */}
      <h2 className="text-lg font-bold flex items-center gap-2 mt-4">
        <Hand className="w-5 h-5 text-orange-500" />
        Safety Systems
      </h2>
      <div className="bg-surface-dark rounded-xl p-4 border border-surface-border flex items-center justify-between group hover:border-red-500/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
            <Power className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-sm">Emergency Kill-Switch</p>
            <p className="text-[10px] text-slate-500 uppercase">Immediate Power Cutoff</p>
          </div>
        </div>
        <button className="bg-red-500/20 text-red-500 px-4 py-2 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-90">
          KILL
        </button>
      </div>

      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex gap-3">
        <Info className="w-4 h-4 text-primary shrink-0" />
        <p className="text-[10px] text-primary/80 leading-relaxed italic">
          PID configuration is automatically synced with edge controller. Last sync: 2m ago.
        </p>
      </div>
    </motion.div>
  );
};

// --- Main Application ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('monitor');
  const [controls, setControls] = useState<ControlState>({
    heater: { active: true, power: "45%" },
    pump: { active: false }
  });

  const getTitle = () => {
    if (screen === 'monitor') return "TempControl";
    if (screen === 'adjust') return "System Setup";
    return "Enterprise Monitor";
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark font-display">
      <Header
        title={getTitle()}
        showBack={screen !== 'monitor'}
        onBack={() => setScreen('monitor')}
        rightAction={screen === 'adjust' && (
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 text-primary font-bold text-xs rounded-lg hover:bg-primary/30 transition-all">
            <Save className="w-4 h-4" /> SAVE
          </button>
        )}
      />

      <AnimatePresence mode="wait">
        {screen === 'monitor' && <MonitorScreen key="mon" controls={controls} setControls={setControls} />}
        {screen === 'adjust' && <AdjustScreen key="adj" />}
        {['logs', 'settings'].includes(screen) && (
          <motion.div key="misc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-slate-500 opacity-50 px-10 text-center">
            <div className="p-6 bg-surface-dark border border-surface-border rounded-full mb-4">
              <Thermometer className="w-12 h-12" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest mb-1">Module Locked</p>
            <p className="text-[10px] uppercase font-mono">Available in v2.1.0 Enterprise Edition</p>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation current={screen} setScreen={setScreen} />
    </div>
  );
}
