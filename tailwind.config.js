/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", 
    "./node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#0b0b0f",
          surface: "#12121b",
          cyan: "#00f0ff",
          pink: "#ff00c8",
          yellow: "#fffa00",
          purple: "#b700ff",
          accent: "#ff007f",
          text: "#f0f0f0",
        },
      },
      fontFamily: {
        sans: ["Geist", "Arial", "Helvetica", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
      boxShadow: {
        neon: "0 0 8px rgba(0, 240, 255, 0.7), 0 0 16px rgba(0, 240, 255, 0.5)",
        neonPink: "0 0 8px rgba(255, 0, 200, 0.7), 0 0 16px rgba(255, 0, 200, 0.5)",
      },
      backgroundImage: {
        "gradient-neon": "linear-gradient(135deg, #00f0ff, #ff00c8, #fffa00)",
      },
    },
  },
  plugins: [],
  darkMode: "media", // поддержка prefers-color-scheme
};
