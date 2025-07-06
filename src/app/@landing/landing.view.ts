import { ActivatedRoute, RouterModule } from '@angular/router';
import {
    AfterViewInit,
    Component,
    OnInit,
    PLATFORM_ID,
    inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Gradient } from 'whatamesh';
import { version } from '../../../package.json';
import { BehaviorSubject, delay, tap } from 'rxjs';

@Component({
    selector: 'landing',
    templateUrl: './landing.view.html',
    styleUrls: ['./landing.view.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule],
})
export class LandingView implements AfterViewInit, OnInit {
    private platformId = inject(PLATFORM_ID);
    private route = inject(ActivatedRoute);

    readonly version = version;

    $loading = new BehaviorSubject(true);

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            const gradient = new Gradient();
            gradient.initGradient('#gradient');
        }
    }

    ngOnInit(): void {
        this.route.queryParams
            .pipe(
                tap((params) => {
                    if (!params['token']) this.$loading.next(false);
                }),
            )
            .subscribe();
    }

    getGoogleSignInLink(): string {
        return `${environment.API_URL}/auth/google`;
    }
}
