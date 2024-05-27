import { AfterViewInit, Component, PLATFORM_ID, inject } from '@angular/core';
import { Gradient } from 'whatamesh';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'landing',
    templateUrl: './landing.view-component.html',
    styleUrls: ['./landing.view-component.scss'],
    standalone: true,
})
export class LandingViewComponent implements AfterViewInit {
    private platformId = inject(PLATFORM_ID);

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            const gradient = new Gradient();
            gradient.initGradient('#gradient');
        }
    }
}
