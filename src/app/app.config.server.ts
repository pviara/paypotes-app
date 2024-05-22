import { appConfig } from './app.config';
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';

const serverConfig: ApplicationConfig = {
    providers: [],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
