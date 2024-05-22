import { Groups } from '../../model/group/group';
import { Observable } from 'rxjs';

export interface GroupService {
    groups: Observable<Groups>;
}
