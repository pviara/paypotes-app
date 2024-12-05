import { ChoseContactsComponent } from '@groups/add-group/chose-contacts/chose-contacts.component';
import { FillDetailsComponent } from '@groups/add-group/fill-details/fill-details.component';
import { MembersComponent } from '@groups/add-group/members/members.component';
import { Routes } from '@angular/router';
import { SelectEmojiComponent } from '@groups/add-group/select-emoji/select-emoji.component';
import { SelectPersonsComponent } from '@groups/add-group/select-persons/select-persons.component';

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
        path: 'members/contacts',
        component: ChoseContactsComponent,
    },
    {
        path: '**',
        redirectTo: 'details',
    },
];
