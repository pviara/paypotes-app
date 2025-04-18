import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
    selector: 'form-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class ButtonComponent {
    disabled = input<boolean>(false);
    glowing = input<boolean>(false);
    text = input<string>('Suivant');

    @Output()
    clicked = new EventEmitter<never>();

    onClicked(): void {
        this.clicked.emit();
    }
}
