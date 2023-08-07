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
        subtle: "#f9fafb",
        white: "#ffffff",
      },
      textColor: {
        default: "#000000",
        muted: "#9ca3af",
        success: "#285231",
        error: "#752522",
      },
      borderColor: {
        subtle: "#e5e3eb",
      },
    },
  },
  plugins: [],
};
