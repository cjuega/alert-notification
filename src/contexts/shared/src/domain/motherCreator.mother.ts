import * as faker from 'faker';

export default class MotherCreator {
    static uuid(): string {
        return faker.datatype.uuid();
    }

    static indexNumber(max: number): number {
        return faker.datatype.number({ min: 0, max });
    }

    static words(): string {
        return faker.lorem.words();
    }
}
