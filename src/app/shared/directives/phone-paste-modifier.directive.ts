import { Directive, HostListener, inject } from '@angular/core';
import { mapPhoneNumberOutOf } from '@shared/directives/formatter';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[phonePasteModifier]',
    standalone: true,
})
export class PhonePasteModifierDirective {
    private ngControl = inject(NgControl);

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
        const { clipboardData } = event;
        const { control } = this.ngControl;
        if (clipboardData && control) {
            event.preventDefault();

            const textToPaste = clipboardData.getData('text');
            try {
                const formattedPhoneNumber = mapPhoneNumberOutOf(textToPaste);
                control.setValue(formattedPhoneNumber);
            } catch (error: unknown) {}
        }
    }
}
