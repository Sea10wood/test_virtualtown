import { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // ダークモードを有効にする
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1a202c',
        light: '#f7fafc',
        primary: '#2d3748',
        secondary: '#4a5568',
        accent: '#718096',
        background: '#2d3748',
        foreground: '#e2e8f0',
      },
      lineHeight: {
        relaxed: '1.75',
      },
    },
  },
  plugins: [],
}

export default config

