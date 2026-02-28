# Design System: Dashboard Temp Monitor
**Project ID:** 4792373877598741482

## 1. Visual Theme & Atmosphere
The design system for the **Dashboard Temp Monitor** is **High-Tech, Industrial, and Modern**. It features a "Dark Mode" aesthetic that emphasizes critical data through high-contrast colors and subtle glows. The overall vibe is **Utilitarian yet Premium**, suitable for technical monitoring applications. It uses a **Dense** layout style that prioritizes information density while maintaining readability through generous spacing between distinct functional sections.

## 2. Color Palette & Roles
*   **Deep Space Navy (#111722 / #101622):** The primary background color, providing a professional dark foundation for the UI.
*   **Electric Primary Blue (#2b6cee):** Used for primary actions, active indicators, and branding elements.
*   **Vibrant Amber (#f59e0b):** Specifically reserved for the **Heater** status and active heating states, conveying heat and attention.
*   **Cyan Pulse (#06b6d4):** Used for **Pump** status and secondary fluid-related active states.
*   **Critical Red (#ef4444):** Exclusively for **Alarms**, Emergency Stops, and high-priority warnings.
*   **Success Green (#22c55e):** Used for positive trends, health status indicators, and "Connected" states.
*   **Slate Gray Hierarchy (#94a3b8):** Used for secondary text, units, and structural borders.

## 3. Typography Rules
*   **Font Family:** Uses **Space Grotesk** as the primary font for both display (headers) and body text, giving it a technical, slightly futuristic feel.
*   **Headings:** Thick, bold weights (700) for large temperature readouts and section titles.
*   **Body:** Medium weights (400-500) for labels and status descriptions.
*   **Monospace:** Utilized for numerical values and uptime timers to ensure vertical alignment and a "data-driven" aesthetic.

## 4. Component Stylings
*   **Buttons (Controls):** 
    *   **Shape:** Large, generously rounded rectangles (`rounded-2xl`).
    *   **Behavior:** Features a subtle scale-down on click (`active:scale-95`) and hover glows (`shadow-glow-amber`).
    *   **Icons:** Large, filled Material Symbols centered within the button.
*   **Cards/Containers:** 
    *   **Background:** Slightly lighter surface colors (`bg-surface-dark`) than the main background.
    *   **Borders:** Thin, subtle borders (`border-surface-border`) to define structural boundaries.
    *   **Shadows:** Features an "Inner Glow" (`inset 0 2px 4px 0 rgba(255, 255, 255, 0.05)`) to create depth.
*   **Inputs/Forms:** 
    *   **Range Sliders:** Custom accent colors matching the parameter type (Kp: Blue, Ki: Purple, Kd: Teal).
    *   **Toggles:** Custom labels that change background color and border when the hidden checkbox is checked.

## 5. Layout Principles
*   **Mobile-First:** Optimized for a narrow, max-width container (simulating a mobile device).
*   **Vertical Hierarchy:** Critical monitoring at the top, trends in the middle, and interactive controls at the bottom.
*   **Bottom Navigation:** A fixed navigation bar at the bottom for easy thumb access, featuring icon-label pairs.
*   **Whitespace:** Uses consistent padding (`px-6`, `p-4`) to prevent the dense information from feeling cluttered.
