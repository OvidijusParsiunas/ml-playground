import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from '@nabla/vite-plugin-eslint';

// https://vitejs.dev/config/
// eslintPlugin enables linting in dev server runtime
export default defineConfig({
  plugins: [react(), eslintPlugin({ shouldLint: (path) => Boolean(path.match(/\/src\/[^?]*\.(js|tsx|ts|json)/)) })],
});
