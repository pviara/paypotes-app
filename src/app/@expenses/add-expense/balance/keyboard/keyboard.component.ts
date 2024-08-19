import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
    selector: 'keyboard',
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent {
    invalid = input<boolean>(true);

    keyboard = input.required<string[]>();

    @Output()
    keyClicked = new EventEmitter<string>();

    onKeyClicked(key: string): void {
        this.keyClicked.emit(key);
    }
}
