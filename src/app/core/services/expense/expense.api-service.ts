import {
    AddGroupExpenseDTO,
    AddPairExpenseDTO,
    ExpenseService,
} from '@core/services/expense/expense.service';
import { Contact } from '@core/model/contact/contact';
import { Filters } from '@core/model/filters/filters';
import { generateRandomBalance } from '@shared/utils/generate-random-balance';
import { generateRandomDate } from '@shared/utils/get-random-date';
import { generateRandomName } from '@shared/utils/generate-random-name';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { getRandomAvatarUrl } from '@shared/utils/generate-random-avatar-url';
import { getRandomEmoji } from '@shared/utils/get-random-emoji';
import {
    Credit,
    GroupExpense,
    GroupExpenses,
} from '@core/model/expense/group-expense';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, map } from 'rxjs';
import { PairExpense, PairExpenses } from '@core/model/expense/pair-expense';
import {
    PairExpenseDTO,
    PairExpenseDTOs,
} from '@core/model/expense/pair-expense.dto';
import { QueryService } from '@core/services/query/query.service';
import {
    CreditDTO,
    GroupExpenseDTO,
    GroupExpenseDTOs,
} from '@core/model/expense/group-expense.dto';
import { generateRandomGroup } from '@shared/utils/generate-random-group';
import { Group, GroupMetadata } from '@core/model/group/group';
import { GroupDTO } from '@core/model/group/group.dto';
import { MemberDTO } from '@core/model/group/member.dto';
import { Member, Members } from '@core/model/group/member';
import { ExpenseMetadata } from '@core/model/expense/expense';

export class ExpenseAPIService implements ExpenseService {
    private readonly endpoint = '/api/expense';

    constructor(
        private httpClientService: HttpClientService,
        private queryService: QueryService,
    ) {}

    addGroupExpense(payload: AddGroupExpenseDTO): Observable<void> {
        return this.httpClientService.post(`${this.endpoint}/group`, payload);
    }

    addPairExpense(payload: AddPairExpenseDTO): Observable<void> {
        return this.httpClientService.post(`${this.endpoint}/pair`, payload);
    }

    getContactExpenses(
        contactId: string,
        pageIndex = 0,
        filters?: Filters,
    ): Observable<PairExpenses> {
        const query = this.queryService.buildQueryFrom({
            pageIndex,
            filters,
        });

        return this.httpClientService
            .get(`${this.endpoint}/contact/${contactId}${query}`)
            .pipe(
                map(() => this.getRandomPairExpenseDTOs()),
                map((expenses) => this.mapPairExpenses(expenses)),
            );
    }

    getExpense(id: string): Observable<GroupExpense | PairExpense> {
        return this.httpClientService.get(`${this.endpoint}/${id}`).pipe(
            map(() => this.getRandomPairExpenseDTO(0)),
            map((expense) => this.mapPairExpense(expense)),
        );
    }

    getExpenses(
        pageIndex = 0,
        filters?: Filters,
    ): Observable<GroupExpenses | PairExpenses> {
        const query = this.queryService.buildQueryFrom({ pageIndex, filters });

        return this.httpClientService.get(`${this.endpoint}${query}`).pipe(
            map(() => this.getRandomPairExpenseDTOs()),
            map((expenses) => this.mapPairExpenses(expenses)),
        );
    }

    getGroupExpenses(
        groupId: string,
        pageIndex = 0,
        filters?: Filters,
    ): Observable<GroupExpenses> {
        const query = this.queryService.buildQueryFrom({
            pageIndex,
            filters,
        });

        return this.httpClientService
            .get(`${this.endpoint}/group/${groupId}${query}`)
            .pipe(
                map(() => this.getRandomGroupExpenseDTOs()),
                map((expenses) => this.mapGroupExpenses(expenses)),
            );
    }

    paybackGroupExpense(
        groupId: string,
        expenseId: string,
        debtorIds: Array<string>,
    ): Observable<void> {
        return this.httpClientService.put(
            `${this.endpoint}/payback/group/${groupId}/${expenseId}`,
            { debtorIds },
        );
    }

    paybackPairExpense(contactId: string, expenseId: string): Observable<void> {
        return this.httpClientService.put(
            `${this.endpoint}/payback/pair/${contactId}/${expenseId}`,
            {},
        );
    }

    private getRandomPairExpenseDTOs(): PairExpenseDTOs {
        return Array.from({ length: 20 }).map((_, index) =>
            this.getRandomPairExpenseDTO(index),
        );
    }

    private getRandomPairExpenseDTO(index: number): PairExpenseDTO {
        return {
            id: generateRandomString(),
            label: `Dépense #${index}`,
            emoji: getRandomEmoji(),
            date: generateRandomDate().toISOString(),
            balance: generateRandomBalance(),
            counterparty: {
                id: generateRandomString(),
                firstname: generateRandomName().firstname,
                lastname: generateRandomName().lastname,
                avatarUrl: getRandomAvatarUrl(),
            },
        };
    }

    private getRandomGroupExpenseDTOs(): GroupExpenseDTOs {
        return Array.from({ length: 20 }).map((_, index) =>
            this.getRandomGroupExpenseDTO(index),
        );
    }

    private getRandomGroupExpenseDTO(index: number): GroupExpenseDTO {
        const randomGroup = generateRandomGroup();
        const randomCreditor = randomGroup.getMembers()[0];
        return {
            id: generateRandomString(),
            label: `Dépense #${index}`,
            emoji: getRandomEmoji(),
            date: generateRandomDate().toISOString(),
            balance: generateRandomBalance(),
            group: {
                id: randomGroup.getId(),
                name: randomGroup.getName(),
                emoji: randomGroup.getEmoji(),
                members: randomGroup.getMembers().map((member) => ({
                    id: member.getId(),
                    firstname: member.getFirstname(),
                    lastname: member.getLastname(),
                    avatarUrl: member.getAvatarUrl(),
                })),
            },
            credit: {
                balance: generateRandomBalance(),
                creditor: {
                    id: randomCreditor.getId(),
                    firstname: randomCreditor.getFirstname(),
                    lastname: randomCreditor.getLastname(),
                    avatarUrl: randomCreditor.getAvatarUrl(),
                },
            },
        };
    }
    private mapGroupExpenses(expenses: GroupExpenseDTOs): GroupExpenses {
        return expenses.map((expense) => this.mapGroupExpense(expense));
    }

    private mapGroupExpense(expense: GroupExpenseDTO): GroupExpense {
        return new GroupExpense(
            this.mapMetadataFrom(expense),
            this.mapGroupFrom(expense.group),
            this.mapCreditFrom(expense.credit),
            generateRandomBalance(),
        );
    }

    private mapMetadataFrom(
        expense: GroupExpenseDTO | PairExpenseDTO,
    ): ExpenseMetadata {
        return {
            id: expense.id,
            label: expense.label,
            emoji: expense.emoji,
            date: new Date(expense.date),
        };
    }

    private mapGroupFrom(group: GroupDTO): Group {
        const metadata: GroupMetadata = {
            id: group.id,
            name: group.name,
            emoji: group.emoji,
        };
        const members = this.mapMembersFrom(group);
        return new Group({ metadata, members });
    }

    private mapMembersFrom(group: GroupDTO): Members {
        return group.members.map((member) => this.mapMemberFrom(member));
    }

    private mapMemberFrom(member: MemberDTO): Member {
        return new Member({
            id: member.id,
            firstname: member.firstname,
            lastname: member.lastname,
            avatarUrl: member.avatarUrl,
        });
    }

    private mapCreditFrom(credit: CreditDTO): Credit {
        return {
            balance: credit.balance,
            creditor: this.mapMemberFrom(credit.creditor),
        };
    }

    private mapPairExpenses(expenses: PairExpenseDTOs): PairExpenses {
        return expenses.map((expense) => this.mapPairExpense(expense));
    }

    private mapPairExpense(expense: PairExpenseDTO): PairExpense {
        return new PairExpense(
            this.mapMetadataFrom(expense),
            expense.balance,
            this.mapCounterpartyFrom(expense),
        );
    }

    private mapCounterpartyFrom(expense: PairExpenseDTO): Contact {
        return new Contact({
            id: expense.counterparty.id,
            firstname: expense.counterparty.firstname,
            lastname: expense.counterparty.lastname,
            avatarUrl: expense.counterparty.avatarUrl,
        });
    }
}
