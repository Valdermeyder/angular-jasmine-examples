(function () {
    'use strict';
    angular.module('df.core').controller('DfCartoonController', DfCartoonController);

    DfCartoonController.$inject = ['DfCharacterService'];

    function DfCartoonController(DfCharacterService) {
        this.bestCartoons = DfCharacterService.getBestCartoons(10);
    }
})();
