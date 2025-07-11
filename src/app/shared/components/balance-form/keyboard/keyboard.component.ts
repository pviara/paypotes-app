import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
    selector: 'balance-keyboard',
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.component.scss'],
    standalone: false,
})
export class KeyboardComponent {
    keyboard = input.required<string[]>();

    @Output()
    keyClicked = new EventEmitter<string>();

    isDelete(key: string): boolean {
        return key === 'delete';
    }

    onKeyClicked(key: string): void {
        this.keyClicked.emit(key);
    }
}
