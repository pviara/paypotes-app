import { Component, input } from '@angular/core';

@Component({
    selector: 'skeleton',
    templateUrl: './skeleton.component.html',
    styleUrls: ['./skeleton.component.scss'],
    standalone: true,
})
export class SkeletonComponent {
    subhead = input<string>();
}
