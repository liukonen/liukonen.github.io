// vite.config.ts
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import commonjs from '@rollup/plugin-commonjs';

// Equivalent to your esbuild settings
export default defineConfig(({ mode }) => ({
  plugins: [preact(),
            commonjs({
      include: [/node_modules/],
      transformMixedEsModules: true,
      requireReturnsDefault: 'auto', // <-- forces default import compatibility
    }),

  ],
  build: {
    target: 'es2020',          // same as esbuild target
    sourcemap: mode === 'development',  // only in dev
    outDir: 'dist',             // match your esbuild output dir (you can change if needed)
    minify: mode !== 'development',
  },
  css: {
    preprocessorOptions: {
      scss: {} // Enables Sass imports
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  resolve: {
    alias: {
      // Ensures Preact JSX works
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
}));