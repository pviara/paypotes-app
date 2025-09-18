import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
    AfterViewInit,
    Component,
    OnInit,
    PLATFORM_ID,
    inject,
} from '@angular/core';
import { AuthServiceToken } from '@core/services/auth/auth.api-service.provider';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { Capacitor } from '@capacitor/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
import {
    GoogleLoginResponseOnline,
    SocialLogin,
} from '@capgo/capacitor-social-login';
import { Gradient } from 'whatamesh';
import { NotificationService } from '@core/services/notification/notification.service';
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
    private notificationService = inject(NotificationService);
    private platformId = inject(PLATFORM_ID);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    private GOOGLE_IOS_CLIENT_ID =
        '347622651055-9l6rrkau7lmvscr1eoag0m1nd2sjcjht.apps.googleusercontent.com';

    readonly version = version;

    $loading = new BehaviorSubject(false);

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            const gradient = new Gradient();
            gradient.initGradient('#gradient');
        }
    }

    ngOnInit(): void {
        const { token } = this.route.snapshot.queryParams;
        if (token) {
            this.$loading.next(true);
            this.authService
                .getUserFrom(token)
                .pipe(
                    tap(() => this.router.navigate(['/home'])),
                    catchError(() => {
                        this.notificationService.notify({
                            type: 'error',
                            message: 'Échec de connexion. Veuillez réessayer.',
                        });
                        this.$loading.next(false);
                        return of(null);
                    }),
                )
                .subscribe();
        }
    }

    async signIn(): Promise<void> {
        if (Capacitor.isNativePlatform()) {
            this.$loading.next(true);

            const { idToken } = await this.signInWithGoogle();
            this.authService
                .signInWith(idToken ?? '')
                .pipe(
                    catchError((error) => {
                        this.notificationService.notify({
                            type: 'error',
                            message: 'La connexion a échoué',
                        });
                        this.$loading.next(false);
                        return of(error);
                    }),
                )
                .subscribe();
        } else if (isPlatformBrowser(this.platformId)) {
            window.location.href = `${environment.API_URL}/auth/google`;
        }
    }

    private async signInWithGoogle(): Promise<GoogleLoginResponseOnline> {
        await SocialLogin.initialize({
            google: {
                iOSClientId: this.GOOGLE_IOS_CLIENT_ID,
                mode: 'online',
            },
        });
        const { result } = await SocialLogin.login({
            provider: 'google',
            options: {
                scopes: ['email', 'profile'],
            },
        });

        return <GoogleLoginResponseOnline>result;
    }
}
