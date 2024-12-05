export type ValidatorDetails = {
    validate: (value: unknown) => boolean;
};

export enum ValidatorKey {
    MinLengthOne,
    MinLengthTwo,
}

const validateMinLengthOne = (value: unknown): boolean => {
    if (Array.isArray(value)) return value.length >= 1;
    throw new InvalidValueTypeError();
};

const validateMinLengthTwo = (value: unknown): boolean => {
    if (Array.isArray(value)) return value.length >= 2;
    throw new InvalidValueTypeError();
};

const validators = new Map<ValidatorKey, ValidatorDetails>([
    [ValidatorKey.MinLengthOne, { validate: validateMinLengthOne }],
    [ValidatorKey.MinLengthTwo, { validate: validateMinLengthTwo }],
]);

export const getValidator = (key: ValidatorKey): ValidatorDetails => {
    const validator = validators.get(key);
    if (validator) return validator;
    throw new Error(`No validator found for key "${key}"`);
};

export class InvalidValueTypeError extends Error {
    constructor() {
        super('Given value is not of the right type');
    }
}
