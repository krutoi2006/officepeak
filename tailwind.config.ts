import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: ['./components/**/*.{vue,js,ts}', './layouts/**/*.vue', './pages/**/*.vue', './app.vue'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: { primary: '#171A19', secondary: '#686C69', surface: '#F5F5F1', border: '#E4E5DF', accent: '#9A5B35', accentSoft: '#D7B49D' },
      boxShadow: { subtle: '0 16px 48px rgba(20,25,23,.09)' }
    }
  }
}
