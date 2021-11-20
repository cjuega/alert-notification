import { DomainEvent } from '@src/domain/bus/event/domainEvent';

export interface Marshaller {
    marshall(event: DomainEvent): unknown;
}
