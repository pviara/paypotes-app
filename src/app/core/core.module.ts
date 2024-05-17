import { DefaultHttpClientServiceProvider } from './services/http-client/default-http-client.service.provider';
import { GroupAPIServiceProvider } from './services/group/group.api-service.provider';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [HttpClientModule],
    providers: [DefaultHttpClientServiceProvider, GroupAPIServiceProvider],
})
export class CoreModule {}
