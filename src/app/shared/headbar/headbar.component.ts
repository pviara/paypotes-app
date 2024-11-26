import { BackButtonComponent } from '@shared/headbar/back-button/back-button.component';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'headbar',
    templateUrl: './headbar.component.html',
    styleUrls: ['./headbar.component.scss'],
    standalone: true,
    imports: [BackButtonComponent, RouterModule],
})
export class HeadbarComponent {
    route = input.required<string>();
    subtitle = input<string>();
    title = input<string>();
}
