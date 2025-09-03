import {
    Action,
    ActionButtonComponent,
} from '@shared/components/headbar/action-button/action-button.component';
import { BackButtonComponent } from '@shared/components/headbar/back-button/back-button.component';
import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { DeviceService } from '@core/services/device/device.service';
import { RouterModule } from '@angular/router';
import { TitlesComponent } from '@shared/components/headbar/titles/titles.component';

@Component({
    selector: 'headbar',
    templateUrl: './headbar.component.html',
    styleUrls: ['./headbar.component.scss'],
    standalone: true,
    imports: [
        ActionButtonComponent,
        BackButtonComponent,
        CommonModule,
        RouterModule,
        TitlesComponent,
        ActionButtonComponent,
    ],
})
export class HeadbarComponent {
    private deviceService = inject(DeviceService);

    action = input<Action>();
    route = input.required<string>();
    subhead = input<string>();
    title = input<string | null>();

    $isDeviceIPhone = this.deviceService.$isDeviceIPhone;
}
