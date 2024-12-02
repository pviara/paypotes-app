export class Constraint {
    constructor(private regexp: RegExp) {}

    observedBy(value: string): boolean {
        return this.regexp.test(value);
    }
}
