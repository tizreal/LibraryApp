/** @type {import('tailwindcss').Config} */
export default {
  // content: paths to every file that uses Tailwind classes.
  // // Tailwind reads these files, finds every class name used,
  // // and generates ONLY those CSS rules — keeping the output tiny.
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // All .js and .jsx files in src/
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: "#3B82F6",
        secondary: "#1E293B",
      },
    },
  },
  plugins: [],
};
