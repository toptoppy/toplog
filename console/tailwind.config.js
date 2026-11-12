/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Figtree',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          '"SF Mono"',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      borderRadius: {
        inner: '0.375rem',      // 6px - buttons, chips, tags
        element: '0.625rem',    // 10px - inputs, cards, selects
        container: '0.75rem',   // 12px - modals, panels, tables
        page: '1.75rem',        // 28px - major page wrappers
      },
      boxShadow: {
        'astryx-low': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'astryx-med': '0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
        'astryx-high': '0 12px 32px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)',
      },
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        astryx: {
          canvas: "#f4f4f6",
          card: "#ffffff",
          muted: "#ececf0",
          border: "rgba(0, 0, 0, 0.08)",
          'border-prominent': "rgba(0, 0, 0, 0.14)",
          accent: "#18181b",
          'accent-muted': "#71717a",
          dark: {
            canvas: "#09090b",
            card: "#121215",
            muted: "#1c1c21",
            border: "rgba(255, 255, 255, 0.08)",
            'border-prominent': "rgba(255, 255, 255, 0.16)",
          },
        },
      },
    },
  },
  plugins: [],
}
