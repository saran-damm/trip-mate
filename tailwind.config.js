/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4ECDC4",   // Pastel Teal (TripAdvisor-inspired)
        secondary: "#FF9F9F", // Soft Coral
        accent: "#FFD166",    // Pastel Yellow
        neutral: "#6B7280",   // Soft Gray
        dark: "#2A2A2A",      // Dark Gray
        light: "#F9F7F7",     // Off-White
        surface: "#FFFFFF",   // White
        success: "#A8E6CF",   // Mint Green
        warning: "#FFD3B6",   // Peach
        error: "#FFAAA5",     // Light Salmon
      },
      borderRadius: {
        card: "20px",
        button: "12px",
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.05)",
        hover: "0 8px 20px rgba(0,0,0,0.1)",
        button: "0 4px 6px rgba(78, 205, 196, 0.25)",
      },
    },
  },
  plugins: [],
};