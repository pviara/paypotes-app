export function mapPhoneNumberOutOf(value: string): string {
    checkInvalid(value);

    const cleanedValue = removeSpacesFrom(value);
    if (cleanedValue.startsWith('+33')) {
        const index = indexAfterIndicatorIn(cleanedValue);
        const shortenedValue = cleanedValue.substring(index);
        return shortenedValue.startsWith('0')
            ? shortenedValue
            : `0${shortenedValue}`;
    }

    return cleanedValue;
}

function checkInvalid(value: string): void {
    checkFalsy(value);
    checkInvalidIndicator(value);
    checkInvalidCharacter(value);
    checkInvalidLength(value);
}

function checkInvalidIndicator(value: string): void {
    if (value.startsWith('+33')) {
        const cleanedValue = removeSpacesFrom(value);
        if (cleanedValue.length < 12) {
            throw new Error('Given value contains less than 12 figures');
        }

        const valueAfterIndicator = cleanedValue.substring(
            indexAfterIndicatorIn(cleanedValue),
        );
        console.log(valueAfterIndicator);
        if (
            !valueAfterIndicator.startsWith('06') &&
            !valueAfterIndicator.startsWith('07') &&
            !valueAfterIndicator.startsWith('6') &&
            !valueAfterIndicator.startsWith('7')
        ) {
            throw new Error('Given value does not start with good indicator');
        }
    }

    if (
        !value.startsWith('06') &&
        !value.startsWith('07') &&
        !value.startsWith('+33')
    ) {
        throw new Error('Given value does not start by the right indicator');
    }
}

function checkFalsy(value: string): void {
    if (!value) {
        throw new Error('Given value is empty');
    }
}

function checkInvalidCharacter(value: string): void {
    if (containsLetter(value)) {
        throw new Error('Given value contains letter(s)');
    }

    if (containsSymbol(value)) {
        throw new Error('Given value contains invalid symbol(s)');
    }
}

function containsLetter(value: string): boolean {
    return new RegExp(/[A-Za-z]/).test(value);
}

function containsSymbol(value: string): boolean {
    return new RegExp(/[^\w\s+]/).test(value);
}

function checkInvalidLength(value: string): void {
    if (isAboveMaxLength(value)) {
        throw new Error('Given value contains more than 13 figures');
    }

    if (isBelowMinLength(value)) {
        throw new Error('Given value contains less than 10 figures');
    }
}

function isAboveMaxLength(value: string): boolean {
    return removeSpacesFrom(value).length > 13;
}

function isBelowMinLength(value: string): boolean {
    return removeSpacesFrom(value).length < 10;
}

function removeSpacesFrom(value: string): string {
    return value.replaceAll(' ', '');
}

function indexAfterIndicatorIn(cleanedValue: string): number {
    return cleanedValue.indexOf('+33') + '+33'.length;
}
