import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'form-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class ButtonComponent {
    disabled = input.required<boolean>();
    text = input<string>('Suivant');
}
