export default class AlertAlreadyExists extends Error {
    constructor(id: string) {
        super(`Alert <${id}> already exists`);
    }
}
