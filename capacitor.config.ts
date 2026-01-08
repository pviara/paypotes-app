import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'paypotes.pviara.dev',
    appName: 'paypotes-app',
    webDir: 'dist/paypotes-app/browser',
    plugins: {
        Keyboard: {
            resize: 'body',
        },
    },
};

export default config;
