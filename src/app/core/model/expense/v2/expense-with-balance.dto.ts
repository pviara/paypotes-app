import { PairExpenseDTO } from './pair-expense.dto';

export type ExpenseWithBalanceDTO = PairExpenseDTO & { balance: string };
export type ExpenseWithBalanceDTOs = Array<ExpenseWithBalanceDTO>;
