import EscalationTarget from '@src/shared/domain/escalationPolicies/escalationTarget';
import { NotifiedTargetsFilter } from '@src/notifications/domain/notifiedTargetsFilter';

export default class NotifiedTargetsFilterMock implements NotifiedTargetsFilter {
    private mockFilter = jest.fn();

    async filter(targets: EscalationTarget[]): Promise<EscalationTarget[]> {
        return this.mockFilter(targets);
    }

    whenFilterThenReturn(targets: EscalationTarget[]): void {
        this.mockFilter.mockReturnValue(targets);
    }

    assertFilterHasBeenCalledWith(targets: EscalationTarget[]): void {
        expect(this.mockFilter).toHaveBeenLastCalledWith(targets);
    }
}
