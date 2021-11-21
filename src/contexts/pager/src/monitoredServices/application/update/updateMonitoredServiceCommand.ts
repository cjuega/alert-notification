import Command from '@ans/ctx-shared/domain/bus/command/command';

export type CommandParams = {
    id: string;
    name?: string;
    escalationPolicy?: Array<{ emails: string[]; phoneNumbers: string[] }>;
};

export default class UpdateMonitoredServiceCommand extends Command {
    readonly id: string;

    readonly name?: string;

    readonly escalationPolicy?: Array<{ emails: string[]; phoneNumbers: string[] }>;

    constructor({ id, name, escalationPolicy }: CommandParams) {
        super();

        this.id = id;
        this.name = name;
        this.escalationPolicy = escalationPolicy;
    }
}
