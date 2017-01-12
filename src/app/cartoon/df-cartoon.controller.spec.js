'use strict';
describe('DfCartoonController', function () {
    var dfCartoonCtrl, $controller, $interval, $timeout, DfCartonRefreshInterval, DfShowAdvertTimeout,
        DfCharacterServiceSpy;

    beforeEach(function () {
        module('df.core');
        inject(function ($injector) {
            $controller = $injector.get('$controller');
            $interval = $injector.get('$interval');
            $timeout = $injector.get('$timeout');
            DfCartonRefreshInterval = $injector.get('DfCartonRefreshInterval');
            DfShowAdvertTimeout = $injector.get('DfShowAdvertTimeout');
        });
        DfCharacterServiceSpy = jasmine.createSpyObj('DfCharacterService', ['getBestCartoons']);
    });

    describe('#bestCartoons', function () {
        var bestCartoons = ['Alladin'];

        beforeEach(function () {
            bestCartoons = ['Alladin'];
        });

        it('should get top 10 cartoons from service', function () {
            dfCartoonCtrl = $controller('DfCartoonController', {DfCharacterService: DfCharacterServiceSpy});
            expect(DfCharacterServiceSpy.getBestCartoons).toHaveBeenCalledWith(10);
        });

        it('should be init with received from service value', function () {
            DfCharacterServiceSpy.getBestCartoons.and.returnValue(bestCartoons);
            dfCartoonCtrl = $controller('DfCartoonController', {DfCharacterService: DfCharacterServiceSpy});
            expect(dfCartoonCtrl.bestCartoons).toEqual(bestCartoons);
        });

        describe('should be updated periodically', function () {
            var secondBestCartoons;

            beforeEach(function () {
                secondBestCartoons = ['Alladin 2'];
                DfCharacterServiceSpy.getBestCartoons.and.returnValues(bestCartoons, secondBestCartoons);
                dfCartoonCtrl = $controller('DfCartoonController', {DfCharacterService: DfCharacterServiceSpy});
                $interval.flush(DfCartonRefreshInterval);
            });

            it('each hour', function () {
                expect(DfCharacterServiceSpy.getBestCartoons).toHaveBeenCalledTimes(2);
            });

            it('should show latest best cartoons', function () {
                expect(dfCartoonCtrl.bestCartoons).toEqual(secondBestCartoons);
            });
        });
    });

    describe('#showAdvert', function () {
        it('should be falsy after create', function () {
            dfCartoonCtrl = $controller('DfCartoonController', {DfCharacterService: DfCharacterServiceSpy});
            expect(dfCartoonCtrl.showAdvert).toBeFalsy();
        });

        it('should be true after DfShowAdvertTimeout is elapsed', function () {
            dfCartoonCtrl = $controller('DfCartoonController', {DfCharacterService: DfCharacterServiceSpy});
            $timeout.flush(DfShowAdvertTimeout);
            expect(dfCartoonCtrl.showAdvert).toBeTruthy();
            $timeout.verifyNoPendingTasks();
        });
    });
});
