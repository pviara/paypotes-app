import { AuthServiceToken } from '@core/services/auth/auth.api-service.provider';
import { Component, inject } from '@angular/core';
import { DeviceService } from '@core/services/device/device.service';
import { ExpenseServiceToken } from '@core/services/expense/expense.service.provider';
import { map } from 'rxjs';

@Component({
    selector: 'headbar',
    templateUrl: './headbar.component.html',
    styleUrls: ['./headbar.component.scss'],
    standalone: false,
})
export class HeadbarComponent {
    private authService = inject(AuthServiceToken);
    private deviceService = inject(DeviceService);
    private expenseService = inject(ExpenseServiceToken);

    avatarUrl = this.authService.getActorAvatarUrlOrDefault();

    $balance = this.expenseService.computeBalance();

    $isDebt = this.$balance.pipe(
        map((balance) => (balance.includes('-') ? true : false)),
    );

    $isDeviceIPhone = this.deviceService.$isDeviceIPhone;
}
