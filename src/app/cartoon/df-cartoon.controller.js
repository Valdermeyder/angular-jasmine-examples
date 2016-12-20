(function () {
    'use strict';
    angular.module('df.core').controller('DfCartoonController', DfCartoonController);

    DfCartoonController.$inject = ['DfCharacterService', '$interval', 'DfCartonRefreshInterval'];

    function DfCartoonController(DfCharacterService, $interval, DfCartonRefreshInterval) {
        var dfCartoonCtrl = this;

        setBestCartoons();

        $interval(setBestCartoons, DfCartonRefreshInterval);

        function setBestCartoons() {
            dfCartoonCtrl.bestCartoons = DfCharacterService.getBestCartoons(10);
        }
    }
})();
