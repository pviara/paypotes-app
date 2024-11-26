import {
    Action,
    ActionButtonComponent,
} from '@shared/headbar/action-button/action-button.component';
import { BackButtonComponent } from '@shared/headbar/back-button/back-button.component';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitlesComponent } from '@shared/headbar/titles/titles.component';

@Component({
    selector: 'headbar',
    templateUrl: './headbar.component.html',
    styleUrls: ['./headbar.component.scss'],
    standalone: true,
    imports: [
        ActionButtonComponent,
        BackButtonComponent,
        RouterModule,
        TitlesComponent,
        ActionButtonComponent,
    ],
})
export class HeadbarComponent {
    action = input<Action>();
    route = input.required<string>();
    subhead = input<string>();
    title = input<string | null>();
}
