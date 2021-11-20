export default class MonitoredServiceNotFound extends Error {
    constructor(id: string) {
        super(`MonitoredService <${id}> doesn't exist`);
    }
}
