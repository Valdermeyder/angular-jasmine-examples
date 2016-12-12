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
        it('should be init with empty array', function () {
            dfCartoonCtrl = $controller('DfCartoonController');
            expect(dfCartoonCtrl.bestCartoons).toEqual([]);
        });
    });
});
