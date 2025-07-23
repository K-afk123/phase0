/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    // Vitestのデフォルト設定では、時々新しいファイルを見つけられないことがあるため、
    // テストファイルの場所をここで明示的に指定します。
    // これにより、'src'フォルダ内の全てのテストファイルを確実に見つけ出します。
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
});
