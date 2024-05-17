import { HttpClientServiceProvider } from './services/http-client/http-client.service.provider';
import { GroupServiceProvider } from './services/group/group.service.provider';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [HttpClientModule],
    providers: [HttpClientServiceProvider, GroupServiceProvider],
})
export class CoreModule {}
