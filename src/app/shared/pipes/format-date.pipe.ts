import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
    private readonly days = [
        'dimanche',
        'lundi',
        'mardi',
        'mercredi',
        'jeudi',
        'vendredi',
        'samedi',
    ];
    private readonly months = [
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'décembre',
    ];

    transform(date: Date): string {
        const dayOfMonth = date.getDate();
        const month = this.months[date.getMonth()];
        const year = date.getFullYear();

        return `${dayOfMonth} ${month} ${year}`;
    }
}
