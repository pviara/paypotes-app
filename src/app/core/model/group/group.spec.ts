import { Group } from './group';

describe('Group', () => {
    it('should name the group correctly', () => {
        const name = 'Bretagne';
        const sut = new Group({
            id: '4532ddgk',
            name,
            members: [],
        });

        expect(sut.getName()).toBe(name);
    });

    it('should count the right amount of people', () => {
        const members = ['Peter', 'Nicholas', 'Gia'];
        const sut = new Group({
            id: '3819poa91',
            name: 'Bretagne',
            members,
        });

        expect(sut.countMembers()).toBe(members.length);
    });
});
