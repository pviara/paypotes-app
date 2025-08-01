import { Device } from '@capacitor/device';
import { Injectable } from '@angular/core';
import { from, map } from 'rxjs';

@Injectable()
export class DeviceService {
    $isDeviceIPhone = from(Device.getInfo()).pipe(
        map(({ model }) => model.toLowerCase().includes('iphone')),
    );
}
