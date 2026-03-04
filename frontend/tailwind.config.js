module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Salt = light / background neutrals
        salt: {
          50:  "#fafafa",
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e6e6e6",
          400: "#dcdcdc"
        },
        // Pepper = mid → dark neutrals for text and accents
        pepper: {
          100: "#bfbfbf",
          300: "#9e9e9e",
          500: "#6b6b6b",
          700: "#3c3c3c",
          900: "#111111"
        },
        // small accent to use for subtle highlights (optional)
        accent: {
          DEFAULT: "#a8a8a8"
        }
      },
      fontFamily: {
        heading: ["Merriweather", "serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        'soft-lg': '0 10px 30px rgba(16,16,16,0.06)'
      }
    }
  },
  plugins: []
}