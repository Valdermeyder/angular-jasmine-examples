(function () {
    'use strict';
    angular.module('df.core').service('DfCartoonService', DfCartoonService);

    DfCartoonService.$inject = ['DfCharacterService'];

    function DfCartoonService(DfCharacterService) {
        this.getCharacterTitles = function (characters) {
            return characters.map(function (character) {
                return DfCharacterService.getNameWithTitle(character);
            }).join(', ');
        }
    }
})();
