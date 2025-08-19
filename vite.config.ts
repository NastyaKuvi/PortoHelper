import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // base: 'https://NastyaKuvi.github.io/PortoHelper/', // путь к подкаталогу на GitHub Pages
});
