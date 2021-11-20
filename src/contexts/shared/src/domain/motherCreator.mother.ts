import * as faker from 'faker';

export default class MotherCreator {
    static uuid(): string {
        return faker.datatype.uuid();
    }
}
