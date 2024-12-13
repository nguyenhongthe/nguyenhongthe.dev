import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig(async () => {
  const { default: tsconfigPaths } = await import('vite-tsconfig-paths')

  return {
    plugins: [tsconfigPaths(), react()],
    test: {
      environment: 'jsdom',
      setupFiles: ['./setupTests.ts']
    }
  }
})
