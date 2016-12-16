'use strict';
describe('DfCartoonController', function () {
    var dfCartoonCtrl, $controller;

    beforeEach(function () {
        module('df.core');
        inject(function ($injector) {
            $controller = $injector.get('$controller');
        });
    });

    describe('#bestCartoons', function () {
        var DfCharacterServiceSpy;

        beforeEach(function () {
            DfCharacterServiceSpy = jasmine.createSpyObj('DfCharacterService', ['getBestCartoons'])
        });

        it('should get top 10 cartoons from service', function () {
            dfCartoonCtrl = $controller('DfCartoonController', {DfCharacterService: DfCharacterServiceSpy});
            expect(DfCharacterServiceSpy.getBestCartoons).toHaveBeenCalledWith(10);
        });

        it('should be init with received from service value', function () {
            var bestCartoons = ['Alladin'];
            DfCharacterServiceSpy.getBestCartoons.and.returnValue(bestCartoons);
            dfCartoonCtrl = $controller('DfCartoonController', {DfCharacterService: DfCharacterServiceSpy});
            expect(dfCartoonCtrl.bestCartoons).toEqual(bestCartoons);
        });
    });
});
