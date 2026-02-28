# 🌡️ Thermocore Enterprise V2

[![Enterprise Edition](https://img.shields.io/badge/Edition-Enterprise-blue?style=for-the-badge)](https://github.com/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Thermocore Enterprise V2** is a professional-grade industrial temperature control monitoring and PID adjustment dashboard. Designed for high-stakes environments where precision and reliability are paramount.

---

## ✨ Key Features

### 📡 Real-time Monitoring
- **Precision Tracking**: Sub-decimal temperature monitoring with trend indicators.
- **Micro-Animations**: Pulse-based status badges for active Alarms and Heater units.
- **Live Graphs**: Dynamic chart engine powered by `Recharts` for sub-second trend analysis.

### 🎛️ System Adjustment
- **PID Control Suite**: Granular adjustment for Proportional (Kp), Integral (Ki), and Derivative (Kd) coefficients.
- **Safety First**: Integrated Emergency Kill-Switch with visual feedback for immediate manual override.

### 💎 High-End UI/UX
- **Dark Mode Architecture**: Eye-friendly theme for control room environments.
- **Tactile Transitions**: Smooth, physics-based UI transitions using `Framer Motion`.
- **Systematic Design**: Built on a semantic design system documented in `DESIGN.md`.

---

## 🛠️ Technology Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Core** | React 19 (TypeScript) | Type-safety & Modern Component Model |
| **Styling** | Tailwind CSS v4 | Semantic tokens & Utility-first efficiency |
| **Animations** | Framer Motion | Physics-based interactive feedback |
| **Data Viz** | Recharts | Low-latency SVG chart engine |
| **Icons** | Lucide React | Consistent, high-fidelity iconography |

---

## 📂 Project Structure

```bash
src/
├── components/   # Modular UI elements (Monitor, Adjust, Nav)
├── data/         # MockData & Initial system states
├── hooks/        # Future implementation for WebSocket hooks
└── utils/        # Internal formatting & CN utility
```

---

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Launch Dev Server**
   ```bash
   npm run dev
   ```
3. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📑 Design Philosophy

This project follows the **Semantic Design System** (see [DESIGN.md](./DESIGN.md)). 
- **Space Grotesk** for readability in technical contexts.
- **Subtle Glows** for high-priority active states.
- **Responsive Geometry**: Subtly rounded corners (`2xl`) for a premium modern feel.

---

*© 2026 Thermocore Systems Interface. All rights reserved.*
