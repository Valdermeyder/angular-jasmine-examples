(function () {
    'use strict';
    angular.module('df.core').service('DfCartoonService', DfCartoonService);

    DfCartoonService.$inject = ['DfCharacterService', '$http'];

    function DfCartoonService(DfCharacterService, $http) {
        this.getCharacterTitles = function (characters) {
            return characters.map(function (character) {
                return DfCharacterService.getNameWithTitle(character);
            }).join(', ');
        };

        this.getCharacters = function () {
            return $http({
                method: 'GET',
                url: '/characters'
            })
        };
    }
})();
