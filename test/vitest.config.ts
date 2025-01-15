import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        globals: true,
        root: './',
        setupFiles: ['/test/angular-test-setup.ts'],
        reporters: ['verbose'],
        pool: 'threads',
    },
    resolve: {
        alias: {
            '@core': path.resolve(__dirname, '/src/app/core'),
            '@expenses': path.resolve(__dirname, '/src/app/expenses'),
            '@shared': path.resolve(__dirname, '/src/app/shared'),
            '@test': path.resolve(__dirname, '/test'),
        },
    },
});
