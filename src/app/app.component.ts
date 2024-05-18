import { Component } from '@angular/core';
import { CoreModule } from './core/core.module';
import { RouterOutlet } from '@angular/router';
import { HomeComponentModule } from './home/home.component-module';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CoreModule, HomeComponentModule, RouterOutlet],
    templateUrl: './app.component.html',
})
export class AppComponent {}
