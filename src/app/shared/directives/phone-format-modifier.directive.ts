import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[phoneFormatModifier]',
    standalone: true,
})
export class PhoneFormatModifierDirective {
    @HostListener('input', ['$event'])
    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;

        const value = this.removeUndesiredCharactersFrom(input.value);
        input.value = this.addSpaceEveryTwoDigits(value);
    }

    private removeUndesiredCharactersFrom(value: string): string {
        const valueWithoutSpaces = this.removeSpacesFrom(value);
        return this.removeNonNumericCharsFrom(valueWithoutSpaces);
    }

    private removeSpacesFrom(value: string): string {
        return value.replace(/\s/g, '');
    }

    private removeNonNumericCharsFrom(value: string): string {
        return value.replace(/[^\d]/g, '');
    }

    private addSpaceEveryTwoDigits(value: string): string {
        return value.replaceAll(/(\d{2})(?=\d)/g, '$1 ').trim();
    }
}
