import { Component, input } from '@angular/core';

@Component({
    selector: 'balance-displayer',
    templateUrl: './displayer.component.html',
    styleUrls: ['./displayer.component.scss'],
})
export class DisplayerComponent {
    balance = input<unknown>();
}
