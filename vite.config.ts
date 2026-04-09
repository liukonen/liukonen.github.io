import {defineConfig} from 'vite'
import preact from  '@preact/preset-vite'
import Icons from 'unplugin-icons/vite'


// vite.config.ts
//import { defineConfig } from 'vite';
//import preact from '@preact/preset-vite';
//import commonjs from '@rollup/plugin-commonjs';

// Equivalent to your esbuild settings
export default defineConfig(({ mode }) => ({
  plugins: [
    preact(),
    Icons({
      compiler: 'jsx',
      jsx: 'preact',
      autoInstall: true
    })
  ],
  build: {
    target: 'esnext',
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 3,
        drop_console: true,
        pure_funcs: ['consolr.info', 'console.log']
      },
      mangle: {
        toplevel: true,
      },
      format: {
        comments: false,
      },
    },
              // same as esbuild target
    sourcemap: mode === 'development',  // only in dev
    //outDir: 'dist',             // match your esbuild output dir (you can change if needed)
    //minify: mode !== 'development',
    rollupOptions: {
      output: {
        manualChunks: undefined,
    },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {} 
    },
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
}));