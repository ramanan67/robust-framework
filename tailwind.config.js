/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--glass-bg)",
        border: "var(--glass-border)",
        primary: {
          DEFAULT: "#6366F1",
          hover: "#4F46E5",
          glow: "rgba(99, 102, 241, 0.5)",
        },
        secondary: {
          DEFAULT: "#ec4899",
          glow: "rgba(236, 72, 153, 0.3)",
        },
        text: {
          main: "var(--text-main)",
          muted: "var(--text-muted)",
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(99, 102, 241, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.6)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
