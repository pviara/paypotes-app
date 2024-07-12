import { Component } from '@angular/core';

@Component({
    selector: 'skeleton',
    host: { collisionId: 'picker-skeleton' },
    templateUrl: './skeleton.component.html',
    styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent {}
