import { default as react, reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import babel from '@rolldown/plugin-babel'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
    },
  },
  plugins: [
    tanstackRouter({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
      autoCodeSplitting: true,
      routeTreeFileHeader: [
        '/* eslint-disable */',
        '// noinspection JSUnusedGlobalSymbols',
      ],
      routeTreeFileFooter: ['export {}'],
    }),
    react(),
    tailwindcss(),
    babel({
      presets: [reactCompilerPreset()],
      exclude: [/src\/routeTree\.gen\.ts/, /node_modules/],
    }),
  ],
})