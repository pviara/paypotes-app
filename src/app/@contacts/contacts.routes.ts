import { ContactComponent } from '@contacts/contact/contact.component';
import { ContactsComponent } from '@contacts/contacts/contacts.component';
import { ContactsView } from '@contacts/contacts.view';
import { Routes } from '@angular/router';

export const contactRoutes: Routes = [
    {
        path: '',
        component: ContactsView,
        children: [
            {
                path: '',
                component: ContactsComponent,
                title: 'Contacts',
            },
            {
                path: ':contactId',
                component: ContactComponent,
                title: 'Contact',
                data: { hideMenu: true },
            },
        ],
    },
];
