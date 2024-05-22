import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        globals: true,
        root: './',
        reporters: ['verbose'],
    },
    resolve: {
        alias: {
            '@test': path.resolve(__dirname, '/test'),
        },
    },
});
