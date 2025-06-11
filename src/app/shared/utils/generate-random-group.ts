import { generateRandomMember } from '@shared/utils/generate-random-member';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { getRandomEmoji } from '@shared/utils/get-random-emoji';
import { Group } from '@core/model/group/group';

export const generateRandomGroup = () =>
    new Group({
        metadata: {
            id: generateRandomString(),
            emoji: getRandomEmoji(),
            name: 'Bretagne',
        },
        members: Array.from({ length: 3 }).map(() => generateRandomMember()),
    });
