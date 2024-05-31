import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'headbar',
    templateUrl: './headbar.component.html',
    styleUrls: ['./headbar.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class HeadbarComponent {
    private route = inject(ActivatedRoute);
    private title = inject(Title);

    viewTitle = this.title.getTitle();

    $viewType = this.route.firstChild?.data.pipe(map((data) => data['type']));
}
