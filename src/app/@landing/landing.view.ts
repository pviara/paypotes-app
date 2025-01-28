import { AfterViewInit, Component, PLATFORM_ID, inject } from '@angular/core';
import { Gradient } from 'whatamesh';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'landing',
    templateUrl: './landing.view.html',
    styleUrls: ['./landing.view.scss'],
    standalone: true,
    imports: [RouterModule],
})
export class LandingView implements AfterViewInit {
    private platformId = inject(PLATFORM_ID);

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            const gradient = new Gradient();
            gradient.initGradient('#gradient');
        }
    }
}
