import { Directive, forwardRef, Host, HostListener, Self } from '@angular/core';
import { ContactComponent } from '@contacts/contact/contact.component';
import { mapPhoneNumberOutOf } from '@shared/directives/formatter';

@Directive({
    selector: '[phonePasteModifier]',
    standalone: true,
})
export class PhonePasteModifierDirective {
    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent): void {
        const { clipboardData } = event;
        if (clipboardData) {
            event.preventDefault();

            try {
                const textToPaste = clipboardData.getData('text');
                const phoneNumber = mapPhoneNumberOutOf(textToPaste.trim());
                this.changeValueOf(event, phoneNumber);
            } catch (error: unknown) {}
        }
    }

    private changeValueOf(event: ClipboardEvent, phoneNumber: string): void {
        const target = event.target as HTMLInputElement;
        target.value = phoneNumber;

        const changeEvent = new Event('change');
        console.log(target);
        target?.dispatchEvent(changeEvent);
    }
}
