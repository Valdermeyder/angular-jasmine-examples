'use strict';
describe('DfCartoonController', function () {
    var dfCartoonCtrl, $controller, DfCharacterServiceSpy;

    beforeEach(function () {
        module('df.core');
        module(function ($provide) {
            $provide.service('DfCharacterService', function () {
                this.getBestCartoons = jasmine.createSpy('getBestCartoons');
            });
        });
        inject(function ($injector) {
            $controller = $injector.get('$controller');
            DfCharacterServiceSpy = $injector.get('DfCharacterService');
        });
    });

    describe('#bestCartoons', function () {
        it('should get top 10 cartoons from service', function () {
            dfCartoonCtrl = $controller('DfCartoonController');
            expect(DfCharacterServiceSpy.getBestCartoons).toHaveBeenCalledWith(10);
        });

        it('should be init with received from service value', function () {
            var bestCartoons = ['Alladin'];
            DfCharacterServiceSpy.getBestCartoons.and.returnValue(bestCartoons);
            dfCartoonCtrl = $controller('DfCartoonController');
            expect(dfCartoonCtrl.bestCartoons).toEqual(bestCartoons);
        });
    });
});
