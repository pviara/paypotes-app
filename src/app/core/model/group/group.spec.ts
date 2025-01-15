import { Group } from '@core/model/group/group';
import { generateRandomString } from '@shared/utils/generate-random-string';

describe('Group', () => {
    it('should name the group correctly', () => {
        const name = 'Bretagne';
        const sut = new Group({
            id: generateRandomString(),
            name: 'Bretagne',
            emoji: '🌊',
            members: [],
            balance: 280,
        });

        expect(sut.getName()).toBe(name);
    });

    it('should count the right amount of people', () => {
        const members = ['Peter', 'Nicholas', 'Gia'];
        const sut = new Group({
            id: generateRandomString(),
            name: 'Bretagne',
            emoji: '🌊',
            members,
            balance: 280,
        });

        expect(sut.countMembers()).toBe(members.length);
    });
});
