import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
    AfterViewInit,
    Component,
    OnInit,
    PLATFORM_ID,
    inject,
} from '@angular/core';
import { AuthServiceToken } from '@core/services/auth/auth.api-service.provider';
import { BehaviorSubject, catchError, filter, of, switchMap, tap } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Gradient } from 'whatamesh';
import { version } from '../../../package.json';

@Component({
    selector: 'landing',
    templateUrl: './landing.view.html',
    styleUrls: ['./landing.view.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule],
})
export class LandingView implements AfterViewInit, OnInit {
    private authService = inject(AuthServiceToken);
    private platformId = inject(PLATFORM_ID);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

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
                switchMap(({ token }) =>
                    this.authService.getUserFromToken(token),
                ),
                tap(() => this.router.navigate(['/home'])),
                catchError(() => {
                    this.$loading.next(false);
                    return of(null);
                }),
            )
            .subscribe();
    }

    getGoogleSignInLink(): string {
        return `${environment.API_URL}/auth/google`;
    }
}
