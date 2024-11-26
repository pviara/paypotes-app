import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'back-button',
    templateUrl: './back-button.component.html',
    styleUrls: ['./back-button.component.scss'],
    standalone: true,
    imports: [RouterModule],
})
export class BackButtonComponent {
    route = input.required<string>();
}
