import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: ['./components/**/*.{vue,js,ts}', './layouts/**/*.vue', './pages/**/*.vue', './app.vue'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: { primary: '#1A1A1A', secondary: '#666666', surface: '#F7F7F5', border: '#E8E8E5' },
      boxShadow: { subtle: '0 8px 30px rgba(0,0,0,.05)' }
    }
  }
}
