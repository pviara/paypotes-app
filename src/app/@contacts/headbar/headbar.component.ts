import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'contacts-headbar',
    templateUrl: './headbar.component.html',
    styleUrls: ['./headbar.component.scss'],
})
export class HeadbarComponent {
    private title = inject(Title);

    viewTitle = this.title.getTitle();
}
