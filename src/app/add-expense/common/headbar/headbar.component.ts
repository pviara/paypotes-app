import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'headbar',
    templateUrl: './headbar.component.html',
    styleUrls: ['./headbar.component.scss'],
    standalone: true,
    imports: [RouterModule],
})
export class HeadbarComponent {
    route = input<string>('..');
    subtitle = input<string>();
    title = input<string>();
}
