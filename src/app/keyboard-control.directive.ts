import { Directive, HostListener } from '@angular/core';

@Directive({ selector: 'div[keyboardControl]' })
export class KeyboardControlDirective {
    @HostListener('click')
    onClick(div: unknown): void {
        console.warn('div clicked', div);
    }
}
