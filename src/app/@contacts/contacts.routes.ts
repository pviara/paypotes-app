import { ContactsComponent } from '@contacts/contacts/contacts.component';
import { ContactsView } from '@contacts/contacts.view';
import { Routes } from '@angular/router';
import { ViewType } from '@core/model/view/view';

export const contactRoutes: Routes = [
    {
        path: '',
        component: ContactsView,
        children: [
            {
                path: '',
                component: ContactsComponent,
                title: 'Contacts',
                data: { type: ViewType.List },
            },
        ],
    },
];
