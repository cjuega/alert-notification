export default class MonitoredServiceAlreadyExists extends Error {
    constructor(id: string) {
        super(`MonitoredService <${id}> already exists`);
    }
}
