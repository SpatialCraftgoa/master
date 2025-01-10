import { defineConfig } from 'vite';

export default defineConfig({
   // Set 'public' as the root directory
  base: './', // Use relative paths for all assets
  server: {
    host: '0.0.0.0', // Allow connections from the local network
    port: 5173, // Port for Vite server
  },
  build: {
   
    assetsDir: '', // Place assets at the root of the dist directory
    sourcemap: true, // Generate source maps for debugging
   
  },
});
