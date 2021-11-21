export default class AlertNotFound extends Error {
    constructor(id: string) {
        super(`Alert <${id}> doesn't exist`);
    }
}
