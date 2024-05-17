import { Component } from '@angular/core';
import { CoreModule } from './core/core.module';
import { RouterOutlet } from '@angular/router';
import { LandingComponentModule } from './landing/landing.component-module';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CoreModule, LandingComponentModule, RouterOutlet],
    templateUrl: './app.component.html',
})
export class AppComponent {}
