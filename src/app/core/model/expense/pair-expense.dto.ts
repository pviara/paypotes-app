import { ContactDTO } from '@core/model/contact/contact.dto';

export type PairExpenseDTO = {
    readonly id: string;
    readonly label: string;
    readonly emoji: string;
    readonly createdAt: string;
    readonly balance: string;
    readonly counterparty: ContactDTO;
};

export type PairExpenseDTOs = Array<PairExpenseDTO>;
