import { Component, input } from '@angular/core';

@Component({
    selector: 'headbar',
    templateUrl: './headbar.component.html',
    styleUrls: ['./headbar.component.scss'],
})
export class HeadbarComponent {
    subtitle = input<string>();
    title = input<string>();
}
