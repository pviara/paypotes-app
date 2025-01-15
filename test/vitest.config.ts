import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        globals: true,
        pool: 'threads',
        reporters: ['verbose'],
        root: './',
        setupFiles: ['/test/angular-test-setup.ts'],
    },
});
