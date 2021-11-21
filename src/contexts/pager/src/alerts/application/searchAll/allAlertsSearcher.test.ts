import AlertRepositoryMock from '@src/alerts/__mocks__/alertRepository.mock';
import AllAlertsSearcher from '@src/alerts/application/searchAll/allAlertsSearcher';
import AlertMother from '@src/alerts/domain/alert.mother';
import SearchAllAlertsResponseMother from '@src/alerts/application/searchAll/searchAllAlertsResponse.mother';
import SearchAllAlertsQueryMother from '@src/alerts/application/searchAll/searchAllAlertsQuery.mother';
import SearchAllAlertsQueryHandler from '@src/alerts/application/searchAll/searchAllAlertsQueryHandler';

describe('allAlertsSearcher', () => {
    it('should return all Alerts', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            handler = new SearchAllAlertsQueryHandler(new AllAlertsSearcher(repository)),
            query = SearchAllAlertsQueryMother.random(),
            alerts = AlertMother.randomList(undefined, query.statusFilter ? { status: query.statusFilter } : undefined),
            expected = SearchAllAlertsResponseMother.fromAlerts(alerts);

        repository.whenSearchAllThenReturn(alerts);

        // eslint-disable-next-line one-var
        const response = await handler.handle(query);

        repository.assertSearchAllHasBeenCalledWith(query.statusFilter);
        expect(response).toStrictEqual(expected);
    });
});
