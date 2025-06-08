import { ContactDTO } from '@core/model/contact/v2/contact.dto';

export type PairExpenseDTO = {
    readonly id: string;
    readonly label: string;
    readonly emoji: string;
    readonly date: string;
    readonly balance: string;
    readonly counterparty: ContactDTO;
};

export type PairExpenseDTOs = Array<PairExpenseDTO>;
