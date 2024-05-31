import { ContactsComponent } from '@contacts/contacts/contacts.component';
import { ContactsViewComponent } from '@contacts/contacts.view-component';
import { Routes } from '@angular/router';

export const contactRoutes: Routes = [
    {
        path: '',
        component: ContactsViewComponent,
        children: [
            { path: '', component: ContactsComponent, title: 'Contacts' },
        ],
    },
];
