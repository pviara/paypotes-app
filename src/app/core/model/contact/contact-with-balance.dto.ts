import { ContactDTO } from './contact.dto';

export type ContactWithBalanceDTO = ContactDTO & { balance: string };
export type ContactWithBalanceDTOs = Array<ContactWithBalanceDTO>;
