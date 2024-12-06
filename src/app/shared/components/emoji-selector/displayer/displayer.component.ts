import { Component, input } from '@angular/core';

@Component({
    selector: 'emoji-displayer',
    templateUrl: './displayer.component.html',
    styleUrls: ['./displayer.component.scss'],
})
export class DisplayerComponent {
    emoji = input<unknown>();
}
