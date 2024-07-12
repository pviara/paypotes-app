import { ContactComponent } from '@contacts/contact/contact.component';
import { ContactsComponent } from '@contacts/contacts/contacts.component';
import { ContactsView } from '@contacts/contacts.view';
import { Routes } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';

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
                path: 'add',
                component: AddContactComponent,
                title: 'Ajouter un contact',
            },
            {
                path: ':contactId',
                component: ContactComponent,
                title: 'Contact',
            },
        ],
    },
];
