import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewService } from '@core/services/view/view.service';

@Component({
    selector: 'headbar',
    templateUrl: './headbar.component.html',
    styleUrls: ['./headbar.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule],
})
export class HeadbarComponent {
    private viewService = inject(ViewService);

    $viewTitle = this.viewService.$viewTitle;
    $viewType = this.viewService.$viewType;
}
