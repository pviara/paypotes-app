import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

export type Action = {
    char: string;
    route: string;
};

@Component({
    selector: 'action-button',
    templateUrl: './action-button.component.html',
    styleUrls: ['./action-button.component.scss'],
    standalone: true,
    imports: [RouterModule],
})
export class ActionButtonComponent {
    action = input.required<Action>();
}
