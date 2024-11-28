import { FillDetailsComponent } from '@groups/add-group/fill-details/fill-details.component';
import { MembersComponent } from '@groups/add-group/members/members.component';
import { Routes } from '@angular/router';
import { SelectEmojiComponent } from '@groups/add-group/select-emoji/select-emoji.component';

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
        path: '**',
        redirectTo: 'details',
    },
];
