(function () {
    'use strict';
    angular.module('df.core').controller('DfCartoonController', DfCartoonController);

    DfCartoonController.$inject = ['DfCharacterService', '$interval', '$timeout', 'DfCartonRefreshInterval',
        'DfShowAdvertTimeout'];

    function DfCartoonController(DfCharacterService, $interval, $timeout, DfCartonRefreshInterval, DfShowAdvertTimeout) {
        var dfCartoonCtrl = this;

        setBestCartoons();

        $interval(setBestCartoons, DfCartonRefreshInterval);

        $timeout(function () {
            dfCartoonCtrl.showAdvert = true;
        }, DfShowAdvertTimeout);

        function setBestCartoons() {
            dfCartoonCtrl.bestCartoons = DfCharacterService.getBestCartoons(10);
        }
    }
})();
