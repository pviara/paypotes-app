import { Groups } from '@core/model/group/group';
import { Observable } from 'rxjs';

export interface GroupService {
    groups: Observable<Groups>;
}
