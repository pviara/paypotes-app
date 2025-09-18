import {
    AddGroupExpenseDTO,
    AddPairExpenseDTO,
    ExpenseService,
} from '@core/services/expense/expense.service';
import { AuthService } from '@core/services/auth/auth.service';
import { Contact } from '@core/model/contact/contact';
import {
    Credit,
    GroupExpense,
    GroupExpenses,
} from '@core/model/expense/group-expense';
import {
    PaymentDTO,
    GroupExpenseDTO,
    GroupExpenseDTOs,
} from '@core/model/expense/group-expense.dto';
import { environment } from 'src/environments/environment';
import { ExpenseMetadata } from '@core/model/expense/expense';
import { Filters } from '@core/model/filters/filters';
import { Group, GroupMetadata } from '@core/model/group/group';
import { GroupDTO } from '@core/model/group/group.dto';
import { MemberDTO } from '@core/model/group/member.dto';
import { Member, Members } from '@core/model/group/member';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, map } from 'rxjs';
import { PairExpense, PairExpenses } from '@core/model/expense/pair-expense';
import {
    PairExpenseDTO,
    PairExpenseDTOs,
} from '@core/model/expense/pair-expense.dto';
import { QueryService } from '@core/services/query/query.service';
import {
    StakeholderDTO,
    StakeholderDTOs,
} from '@core/model/expense/stakeholder.dto';
import {
    Stakeholder,
    StakeholderMetadata,
    Stakeholders,
} from '@core/model/expense/stakeholder';
import { v4 } from 'uuid';

export class ExpenseAPIService implements ExpenseService {
    private readonly endpoint = `${environment.API_URL}/expenses`;

    constructor(
        private authService: AuthService,
        private httpClientService: HttpClientService,
        private queryService: QueryService,
    ) {}

    addGroupExpense(payload: AddGroupExpenseDTO): Observable<void> {
        return this.httpClientService.post(
            `${this.endpoint}/group`,
            {
                ...payload,
                id: v4(),
            },
            {
                headers: { Authorization: `Bearer ${this.authService.token}` },
            },
        );
    }

    addPairExpense(payload: AddPairExpenseDTO): Observable<void> {
        return this.httpClientService.post(
            `${this.endpoint}/pair`,
            {
                ...payload,
                id: v4(),
            },
            {
                headers: { Authorization: `Bearer ${this.authService.token}` },
            },
        );
    }

    computeBalance(): Observable<string> {
        return this.httpClientService.getText(`${this.endpoint}/balance`, {
            headers: { Authorization: `Bearer ${this.authService.token}` },
        });
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
            .get<PairExpenseDTOs>(
                `${this.endpoint}/contact/${contactId}${query}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.authService.token}`,
                    },
                },
            )
            .pipe(map((expenses) => this.mapPairExpenses(expenses)));
    }

    getExpense(id: string): Observable<GroupExpense | PairExpense> {
        return this.httpClientService
            .get<Record<string, unknown>>(`${this.endpoint}/${id}`, {
                headers: { Authorization: `Bearer ${this.authService.token}` },
            })
            .pipe(
                map((expense) => {
                    if (this.isGroupExpenseDTO(expense)) {
                        return this.mapGroupExpense(expense);
                    } else if (this.isPairExpensedDTO(expense)) {
                        return this.mapPairExpense(expense);
                    }
                    throw new Error(
                        `Received DTO "${expense['id']}" does not seem to match any kind of expense`,
                    );
                }),
            );
    }

    getExpenses(
        pageIndex = 0,
        filters?: Filters,
    ): Observable<(GroupExpense | PairExpense)[]> {
        const query = this.queryService.buildQueryFrom({ pageIndex, filters });

        return this.httpClientService
            .get<Record<string, unknown>[]>(`${this.endpoint}${query}`, {
                headers: { Authorization: `Bearer ${this.authService.token}` },
            })
            .pipe(
                map((expenses) =>
                    expenses.map((expense) => {
                        if (this.isGroupExpenseDTO(expense))
                            return this.mapGroupExpense(expense);
                        if (this.isPairExpensedDTO(expense))
                            return this.mapPairExpense(expense);
                        throw new Error(
                            `Received DTO "${expense['id']}" does not seem to match any kind of expense`,
                        );
                    }),
                ),
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
            .get<GroupExpenseDTOs>(
                `${this.endpoint}/group/${groupId}${query}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.authService.token}`,
                    },
                },
            )
            .pipe(map((expenses) => this.mapGroupExpenses(expenses)));
    }

    paybackGroupExpense(
        groupId: string,
        expenseId: string,
        debtorIds: Array<string>,
    ): Observable<void> {
        return this.httpClientService.put(
            `${this.endpoint}/group/${groupId}/${expenseId}`,
            { debtorIds },
            {
                headers: { Authorization: `Bearer ${this.authService.token}` },
            },
        );
    }

    paybackPairExpense(contactId: string, expenseId: string): Observable<void> {
        return this.httpClientService.put(
            `${this.endpoint}/pair/${contactId}/${expenseId}`,
            {},
            {
                headers: { Authorization: `Bearer ${this.authService.token}` },
            },
        );
    }

    private isGroupExpenseDTO(
        dto: Record<string, unknown>,
    ): dto is GroupExpenseDTO {
        return !!dto['group'];
    }

    private isPairExpensedDTO(
        dto: Record<string, unknown>,
    ): dto is PairExpenseDTO {
        return !!dto['counterparty'];
    }

    private mapGroupExpenses(expenses: GroupExpenseDTOs): GroupExpenses {
        return expenses.map((expense) => this.mapGroupExpense(expense));
    }

    private mapGroupExpense(expense: GroupExpenseDTO): GroupExpense {
        return new GroupExpense(
            this.mapMetadataFrom(expense),
            expense.balance,
            this.mapGroupFrom(expense.group),
            this.mapCreditFrom(expense.payment),
            this.mapStakeholdersFrom(expense.stakeholders),
        );
    }

    private mapStakeholdersFrom(dtos: StakeholderDTOs): Stakeholders {
        return dtos.map((stakeholder) => this.mapStakeholderFrom(stakeholder));
    }

    private mapStakeholderFrom(dto: StakeholderDTO): Stakeholder {
        const metadata: StakeholderMetadata = {
            id: dto.id,
            firstname: dto.firstname,
            lastname: dto.lastname,
            avatarUrl: dto.avatarUrl,
        };
        return new Stakeholder(metadata, dto.share);
    }

    private mapMetadataFrom(
        expense: GroupExpenseDTO | PairExpenseDTO,
    ): ExpenseMetadata {
        return {
            id: expense.id,
            label: expense.label,
            emoji: expense.emoji,
            createdAt: new Date(expense.createdAt),
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

    private mapCreditFrom(payment: PaymentDTO): Credit {
        return {
            balance: payment.balance,
            creditor: this.mapMemberFrom(payment.member),
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
