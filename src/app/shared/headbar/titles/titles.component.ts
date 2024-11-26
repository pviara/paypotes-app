import { Component, input } from '@angular/core';
import { SkeletonComponent } from '@shared/headbar/titles/skeleton/skeleton.component';

@Component({
    selector: 'titles',
    templateUrl: './titles.component.html',
    styleUrls: ['./titles.component.scss'],
    standalone: true,
    imports: [SkeletonComponent],
})
export class TitlesComponent {
    subhead = input<string>();
    title = input<string | null>();
}
