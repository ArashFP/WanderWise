/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'timberwolf': '#EDEDED',
        'sage': '#A3B18A',
        'icon-color': '#092C0B',
        'dark-green': '#0E4411',
        'fern-green': '#588157',
        'Hunter green:': '#3A5A40',
        'Brunswick green:': '#344E41',
      },
    },
  },
  plugins: [],
};
