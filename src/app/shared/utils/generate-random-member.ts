import { generateRandomName } from '@shared/utils/generate-random-name';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { getRandomAvatarUrl } from '@shared/utils/generate-random-avatar-url';
import { Member } from '@core/model/group/member';

export const generateRandomMember = () =>
    new Member({
        id: generateRandomString(),
        firstname: generateRandomName().firstname,
        lastname: generateRandomName().lastname,
        avatarUrl: getRandomAvatarUrl(),
    });
