import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
    selector: 'form-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
    active = input<boolean>(false);

    @Output()
    changed = new EventEmitter<boolean>();

    onClicked(): void {
        this.changed.emit(!this.active());
    }
}
