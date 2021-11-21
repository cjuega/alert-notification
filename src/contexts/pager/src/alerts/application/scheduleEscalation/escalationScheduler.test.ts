import DeferredCommandDispatcherMock from '@src/alerts/__mocks__/deferredCommandDispatcher.mock';
import AlertEscalatedDomainEventMother from '@src/alerts/domain/alertEscalatedDomainEvent.mother';
import EscalateAlertCommandMother from '@src/alerts/application/escalate/escalateAlertCommand.mother';
import ScheduleEscalationOnAlertEscalated from '@src/alerts/application/scheduleEscalation/scheduleEscalationOnAlertEscalated';
import EscalationScheduler from '@src/alerts/application/scheduleEscalation/escalationScheduler';
import ClockMock from '@ans/ctx-shared/__mocks__/clock.mock';
import DatetimeMother from '@ans/ctx-shared/domain/datetime.mother';

describe('escalationScheduler', () => {
    const TIMEOUT_DURATION_IN_SECONDS = 900;

    it('should set a timeout to escalate the Alert in 15 minutes', async () => {
        expect.hasAssertions();

        const deferredDispatcher = new DeferredCommandDispatcherMock(),
            clock = new ClockMock(),
            subscriber = new ScheduleEscalationOnAlertEscalated(new EscalationScheduler(deferredDispatcher, clock)),
            domainEvent = AlertEscalatedDomainEventMother.random(),
            now = DatetimeMother.random(),
            triggerAt = now.add(TIMEOUT_DURATION_IN_SECONDS),
            expected = EscalateAlertCommandMother.create({ id: domainEvent.aggregateId });

        clock.whenNowThenReturn(now);

        await subscriber.on(domainEvent);

        deferredDispatcher.assertDeferDispatchHasBeenCalledWith(expected, triggerAt);
    });
});
