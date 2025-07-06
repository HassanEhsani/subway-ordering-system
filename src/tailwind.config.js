// tailwind.config.js
module.exports = {
  darkMode: 'class', // 💡 خیلی مهمه
  content: [
    "./index.html",             // ✅ برای فایل HTML
    "./src/**/*.{js,jsx}",      // ✅ برای همه فایل‌های JS و JSX در src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
