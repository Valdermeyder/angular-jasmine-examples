(function () {
    angular.module('df.core').service('DfCharacterService', DfCharacterService);

    function DfCharacterService() {
        this.getNameWithTitle = function (character) {
            return character.title + ' ' + character.name;
        }
    }
})();
