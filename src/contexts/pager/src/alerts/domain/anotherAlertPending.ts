export default class AnotherAlertPending extends Error {
    constructor(id: string, serviceId: string) {
        super(`There is already a pending Alert <${id}> for MonitoredService <${serviceId}>`);
    }
}
