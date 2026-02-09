
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  
  // ✅ ADD THESE FOR PRODUCTION BUILD
  base: '/',  // Critical for Vercel
  build: {
    outDir: 'dist',
    sourcemap: false,  // Optional: faster builds
    rollupOptions: {
      output: {
        // Ensure proper chunking for Vercel
        manualChunks: undefined,
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  
  // Your existing test config
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  
  // Your existing alias config
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  
  // ✅ ADD THIS FOR BETTER DEVELOPMENT
  server: {
    port: 3000,
    host: true  // Listen on all addresses
  },
  
  // ✅ OPTIONAL: Preview server config
  preview: {
    port: 3000,
    host: true
  }
});