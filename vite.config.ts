import {defineConfig} from 'vite'
import preact from  '@preact/preset-vite'
import Icons from 'unplugin-icons/vite'

export default defineConfig(({ mode }) => ({
  plugins: [
    preact(),
    Icons({
      compiler: 'jsx',
      jsx: 'preact',
      autoInstall: false
    })
  ],
  build: {
    target: 'es2022',
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: mode === 'development',  // only in dev
    //outDir: 'dist', // match your esbuild output dir (you can change if needed)
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
}))