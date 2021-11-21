import AlertRepositoryMock from '@src/alerts/__mocks__/alertRepository.mock';
import AllAlertsSearcher from '@src/alerts/application/searchAll/allAlertsSearcher';
import AlertMother from '@src/alerts/domain/alert.mother';
import SearchAllAlertsResponseMother from '@src/alerts/application/searchAll/searchAllAlertsResponse.mother';
import AlertStatusMother from '@src/alerts/domain/alertStatus.mother';

describe('allAlertsSearcher', () => {
    it('should return all Alerts', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            useCase = new AllAlertsSearcher(repository),
            alerts = AlertMother.randomList(),
            expected = SearchAllAlertsResponseMother.fromAlerts(alerts);

        repository.whenSearchAllThenReturn(alerts);

        // eslint-disable-next-line one-var
        const response = await useCase.run();

        repository.assertSearchAllHasBeenCalledWith();
        expect(response).toStrictEqual(expected);
    });

    it('should return Alerts filtered by status', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            useCase = new AllAlertsSearcher(repository),
            status = AlertStatusMother.random(),
            alerts = AlertMother.randomList(undefined, { status }),
            expected = SearchAllAlertsResponseMother.fromAlerts(alerts);

        repository.whenSearchAllThenReturn(alerts);

        // eslint-disable-next-line one-var
        const response = await useCase.run(status);

        repository.assertSearchAllHasBeenCalledWith(status);
        expect(response).toStrictEqual(expected);
    });
});
