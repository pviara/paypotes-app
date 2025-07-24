import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'paypot.pviara.dev',
    appName: 'paypot-app',
    webDir: 'dist/paypot-app/browser',
    plugins: {
        Keyboard: {
            resize: 'body',
        },
    },
};

export default config;
