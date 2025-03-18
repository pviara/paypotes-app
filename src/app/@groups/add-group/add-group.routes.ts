import { ChoseContactsComponent } from '@groups/add-group/chose-contacts/chose-contacts.component';
import { FillDetailsComponent } from '@groups/add-group/fill-details/fill-details.component';
import { MembersComponent } from '@groups/add-group/members/members.component';
import { ReadSummaryComponent } from '@groups/add-group/read-summary/read-summary.component';
import { Routes } from '@angular/router';
import { SelectEmojiComponent } from '@groups/add-group/select-emoji/select-emoji.component';
import { SelectPersonsComponent } from '@groups/add-group/select-persons/select-persons.component';
import { SelectUserFromSearchComponent } from '@groups/add-group/select-user-from-search/select-user-from-search';

export const addGroupRoutes: Routes = [
    {
        path: 'details',
        component: FillDetailsComponent,
    },
    {
        path: 'emoji',
        component: SelectEmojiComponent,
    },
    {
        path: 'members',
        component: MembersComponent,
    },
    {
        path: 'members/add',
        component: SelectPersonsComponent,
    },
    {
        path: 'members/search',
        component: SelectUserFromSearchComponent,
    },
    {
        path: 'members/contacts',
        component: ChoseContactsComponent,
    },
    {
        path: 'summary',
        component: ReadSummaryComponent,
    },
    {
        path: '**',
        redirectTo: 'details',
    },
];
