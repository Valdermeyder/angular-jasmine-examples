(function () {
	'use strict';
	angular.module('df.core').factory('DfCharacterCreatorFactory', DfCharacterCreatorFactory);

	DfCharacterCreatorFactory.$inject = ['DfCharacterService'];

	function DfCharacterCreatorFactory(DfCharacterService) {
		var characterCreator = function (name, title) {
			this.title = title;
			this.name = name;
		};

		characterCreator.prototype.mergeNameAndTitle = function () {
			this.nameWithTitle = DfCharacterService.getNameWithTitle(this);
		};

		return characterCreator;
	}
})();
