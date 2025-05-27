import { type Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './lib/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        muted: {
          foreground: "#6B7280" // neutral-500
        },
        green: {
          50: "#ECFDF5",
          200: "#A7F3D0",
          800: "#065F46"
        },
        red: {
          50: "#FEF2F2",
          200: "#FECACA"
        },
        blue: {
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      },
      maxWidth: {
        prose: "65ch"
      },
      borderRadius: {
        xl: "1rem"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
}

export default config
