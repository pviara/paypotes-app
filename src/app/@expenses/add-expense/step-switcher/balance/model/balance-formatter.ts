export class BalanceFormatter {
    private balance = '';

    private readonly keyboard = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        ',',
        '0',
        'delete',
    ];

    append(key: string): void {
        if (this.isInvalid(key)) {
            throw new Error(`Given key "${key}" is unknown`);
        }

        this.handle(key);
    }

    getBalance() {
        return this.balance;
    }

    getKeyboard(): Array<string> {
        return this.keyboard;
    }

    private isInvalid(key: string): boolean {
        return !this.keyboard.includes(key);
    }

    private handle(key: string): void {
        if (this.isFirstKey() && this.isSpecial(key)) {
            return;
        }

        if (this.isDelete(key)) {
            this.deleteBalanceLastKey();
            return;
        }

        if (this.balanceHasComma() && this.isComma(key)) {
            return;
        }

        if (this.balanceHasComma() && this.balanceHasMaxDecimals()) {
            return;
        }

        if (
            this.balanceHasNoComma() &&
            this.isNotComma(key) &&
            this.balanceHasMaxIntegers()
        ) {
            return;
        }

        this.balance += key;
    }

    private balanceHasMaxIntegers(): boolean {
        const integers = this.balance.slice(0, 3);
        return integers.length > 2;
    }

    private balanceHasMaxDecimals(): boolean {
        const decimals = this.getBalanceDecimals();
        return decimals.length > 1;
    }

    private getBalanceDecimals(): string {
        const commaIndex = this.balance.indexOf(',');
        return this.balance.slice(commaIndex + 1, this.balance.length);
    }

    private isFirstKey(): boolean {
        return this.balance.length === 0;
    }

    private isSpecial(key: string): boolean {
        return key === '0' || this.isComma(key) || this.isDelete(key);
    }

    private isNotComma(key: string): boolean {
        return key !== ',';
    }

    private isComma(key: string): boolean {
        return key === ',';
    }

    private isDelete(key: string): boolean {
        return key === 'delete';
    }

    private balanceHasNoComma(): boolean {
        return !this.balanceHasComma();
    }

    private balanceHasComma(): boolean {
        return this.balance.includes(',');
    }

    private deleteBalanceLastKey(): void {
        this.balance = this.balance.slice(0, this.balance.length - 1);
    }
}
