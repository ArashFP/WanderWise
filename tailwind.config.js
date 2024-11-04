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
        timberwolf: '#EDEDED',
        sage: '#A3B18A',
        iconColor: '#092C0B',
        darkGreen: '#0E4411',
        fernGreen: '#588157',
        hunterGreen: '#3A5A40',
        BrunswickGreen: '#344E41',
      },
    },
  },
  plugins: [],
};
