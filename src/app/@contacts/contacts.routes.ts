import { ContactsComponent } from '@contacts/contacts/contacts.component';
import { ContactsViewComponent } from '@contacts/contacts.view-component';
import { Routes } from '@angular/router';
import { ViewType } from '@core/model/view/view';

export const contactRoutes: Routes = [
    {
        path: '',
        component: ContactsViewComponent,
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
