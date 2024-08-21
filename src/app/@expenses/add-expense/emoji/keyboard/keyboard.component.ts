import { Component, EventEmitter, input, Output } from '@angular/core';
import { EMOJIS } from '@core/model/emojis';

@Component({
    selector: 'emoji-keyboard',
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent {
    invalid = input<boolean>(true);

    keyboard = Object.keys(EMOJIS);

    @Output()
    keyClicked = new EventEmitter<string>();

    onKeyClicked(key: string): void {
        this.keyClicked.emit(key);
    }
}
