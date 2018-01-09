'use strict';
describe('DfCartoonController', function () {
    var dfCartoonCtrl, $controller, $interval, $timeout, $q, $rootScope, DfCartonRefreshInterval, DfShowAdvertTimeout,
        DfCartoonServiceSpy;

    beforeEach(function () {
        module('df.core');
        inject(function ($injector) {
            $controller = $injector.get('$controller');
            $interval = $injector.get('$interval');
            $timeout = $injector.get('$timeout');
			$q = $injector.get('$q');
			$rootScope = $injector.get('$rootScope');
            DfCartonRefreshInterval = $injector.get('DfCartonRefreshInterval');
            DfShowAdvertTimeout = $injector.get('DfShowAdvertTimeout');
        });
        DfCartoonServiceSpy = jasmine.createSpyObj('DfCartoonService', ['getBestCartoons']);
        DfCartoonServiceSpy.getBestCartoons.and.returnValue($q.resolve())
    });

    describe('#bestCartoons', function () {
        var bestCartoons = ['Alladin'];

        beforeEach(function () {
            bestCartoons = ['Alladin'];
        });

        it('should get top 10 cartoons from service', function () {
            dfCartoonCtrl = $controller('DfCartoonController', {DfCartoonService: DfCartoonServiceSpy});
            expect(DfCartoonServiceSpy.getBestCartoons).toHaveBeenCalledWith(10);
        });

        it('should be init with received from service value', function () {
            DfCartoonServiceSpy.getBestCartoons.and.returnValue($q.resolve(bestCartoons));
            dfCartoonCtrl = $controller('DfCartoonController', {DfCartoonService: DfCartoonServiceSpy});
            $rootScope.$digest();
            expect(dfCartoonCtrl.bestCartoons).toEqual(bestCartoons);
        });

        describe('should be updated periodically', function () {
            var secondBestCartoons;

            beforeEach(function () {
                secondBestCartoons = ['Alladin 2'];
                DfCartoonServiceSpy.getBestCartoons.and.returnValues($q.resolve(bestCartoons), $q.resolve(secondBestCartoons));
                dfCartoonCtrl = $controller('DfCartoonController', {DfCartoonService: DfCartoonServiceSpy});
                $interval.flush(DfCartonRefreshInterval);
            });

            it('each hour', function () {
                expect(DfCartoonServiceSpy.getBestCartoons).toHaveBeenCalledTimes(2);
            });

            it('should show latest best cartoons', function () {
                expect(dfCartoonCtrl.bestCartoons).toEqual(secondBestCartoons);
            });
        });
    });

    describe('#showAdvert', function () {
        it('should be falsy after create', function () {
            dfCartoonCtrl = $controller('DfCartoonController', {DfCartoonService: DfCartoonServiceSpy});
            expect(dfCartoonCtrl.showAdvert).toBeFalsy();
        });

        it('should be true after DfShowAdvertTimeout is elapsed', function () {
            dfCartoonCtrl = $controller('DfCartoonController', {DfCartoonService: DfCartoonServiceSpy});
            $timeout.flush(DfShowAdvertTimeout);
            expect(dfCartoonCtrl.showAdvert).toBeTruthy();
            $timeout.verifyNoPendingTasks();
        });
    });
});
