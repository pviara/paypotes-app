const PREFIX_FR_MOBILE_06 = '06';
const PREFIX_FR_MOBILE_07 = '07';
const PREFIX_FR_MOBILE_6 = '6';
const PREFIX_FR_MOBILE_7 = '7';
const PREFIX_FR_COUNTRY_CODE = '+33';

export function mapPhoneNumberOutOf(text: string): string {
    const phoneNumber = transformToPhoneNumber(text);

    return phoneNumber.startsWith(PREFIX_FR_COUNTRY_CODE)
        ? format(formatWithAppropriatePrefix(phoneNumber))
        : format(phoneNumber);
}

function format(phoneWithPrefix: string): string {
    return phoneWithPrefix
        .split('')
        .map((char, index) => (index % 2 === 1 ? `${char} ` : char))
        .join('')
        .trim();
}

function formatWithAppropriatePrefix(phoneNumber: string): string {
    const index = getIndexAfterPrefixIn(phoneNumber);
    const shortenedValue = phoneNumber.substring(index);
    return shortenedValue.startsWith('0')
        ? shortenedValue
        : `0${shortenedValue}`;
}

function transformToPhoneNumber(text: string): string {
    if (isInvalidPhoneNumber(text)) {
        throw new Error(
            `Given value "${text}" is not a valid french phone number`,
        );
    }
    return removeSpacesFrom(text);
}

function isInvalidPhoneNumber(phoneNumber: string): boolean {
    return (
        !phoneNumber ||
        isLengthInvalid(phoneNumber) ||
        containsInvalidCharacter(phoneNumber) ||
        isInvalidFrenchMobileNumber(phoneNumber)
    );
}

function isLengthInvalid(phoneNumber: string): boolean {
    return isAboveMaxLength(phoneNumber) || isBelowMinLength(phoneNumber);
}

function isAboveMaxLength(phoneNumber: string): boolean {
    return removeSpacesFrom(phoneNumber).length > 13;
}

function isBelowMinLength(phoneNumber: string): boolean {
    return removeSpacesFrom(phoneNumber).length < 10;
}

function containsInvalidCharacter(phoneNumber: string): boolean {
    return containsLetter(phoneNumber) || containsSymbol(phoneNumber);
}

function containsLetter(phoneNumber: string): boolean {
    return new RegExp(/[A-Za-z]/).test(phoneNumber);
}

function containsSymbol(phoneNumber: string): boolean {
    return new RegExp(/[^\w\s+]/).test(phoneNumber);
}

function isInvalidFrenchMobileNumber(phoneNumber: string): boolean {
    if (startsWithUnknownPrefix(phoneNumber)) {
        return true;
    }

    if (phoneNumber.startsWith(PREFIX_FR_COUNTRY_CODE)) {
        const cleanedPhone = removeSpacesFrom(phoneNumber);
        if (cleanedPhone.length < 12) {
            return true;
        }

        return isValueAfterPrefixInvalid(cleanedPhone);
    }

    return false;
}

function startsWithUnknownPrefix(phoneNumber: string): boolean {
    return (
        !phoneNumber.startsWith(PREFIX_FR_MOBILE_06) &&
        !phoneNumber.startsWith(PREFIX_FR_MOBILE_07) &&
        !phoneNumber.startsWith(PREFIX_FR_COUNTRY_CODE)
    );
}

function removeSpacesFrom(phoneNumber: string): string {
    return phoneNumber.replaceAll(' ', '');
}

function isValueAfterPrefixInvalid(phoneNumber: string): boolean {
    const valueAfterPrefix = extractValueAfterPrefix(phoneNumber);
    return (
        !valueAfterPrefix.startsWith(PREFIX_FR_MOBILE_06) &&
        !valueAfterPrefix.startsWith(PREFIX_FR_MOBILE_07) &&
        !valueAfterPrefix.startsWith(PREFIX_FR_MOBILE_6) &&
        !valueAfterPrefix.startsWith(PREFIX_FR_MOBILE_7)
    );
}

function extractValueAfterPrefix(cleanedPhone: string): string {
    return cleanedPhone.substring(getIndexAfterPrefixIn(cleanedPhone));
}

function getIndexAfterPrefixIn(phoneNumber: string): number {
    return (
        phoneNumber.indexOf(PREFIX_FR_COUNTRY_CODE) +
        PREFIX_FR_COUNTRY_CODE.length
    );
}
