/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: '#FDF8F0',
        'cream-dark': '#F5EDE0',
        gold: '#C9A84C',
        'gold-light': '#E8C97E',
        'gold-soft': '#D4B96A',
        'gold-dark': '#A07830',
        rose: {
          deep: '#6B1F2A',
          muted: '#8B3A4A',
        },
        ink: '#1A0F0A',
        foreground: '#1A0F0A',
      },
      fontFamily: {
        'script': ['"Great Vibes"', 'cursive'],
        'dancing': ['"DancingScript"', 'cursive'],
        'serif-display': ['"Cormorant Garamond"', 'serif'],
        'cinzel': ['"Cinzel"', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(0,0,0,0.06)',
        'elegant': '0 8px 40px rgba(201,168,76,0.15)',
        'glow': '0 0 40px rgba(201,168,76,0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-up-delay-1': 'fadeUp 0.8s ease-out 0.2s forwards',
        'fade-up-delay-2': 'fadeUp 0.8s ease-out 0.4s forwards',
        'float-petal': 'floatPetal linear infinite',
        'shimmer': 'shimmer 4s linear infinite',
        'marquee': 'marquee 20s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'butterfly-fly': 'butterflyFly 18s linear infinite',
        'butterfly-flap': 'butterflyFlap 0.25s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatPetal: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '0.8' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        butterflyFly: {
          '0%': { transform: 'translate(-10vw, 60vh) rotate(-8deg) scale(1)' },
          '20%': { transform: 'translate(20vw, 35vh) rotate(6deg) scale(1.05)' },
          '40%': { transform: 'translate(45vw, 55vh) rotate(-4deg) scale(0.95)' },
          '60%': { transform: 'translate(65vw, 25vh) rotate(8deg) scale(1.1)' },
          '80%': { transform: 'translate(85vw, 45vh) rotate(-6deg) scale(1)' },
          '100%': { transform: 'translate(110vw, 30vh) rotate(4deg) scale(1)' },
        },
        butterflyFlap: {
          '0%, 100%': { transform: 'scaleX(1)' },
          '50%': { transform: 'scaleX(0.55)' },
        },
      },
    },
  },
  plugins: [],
}
