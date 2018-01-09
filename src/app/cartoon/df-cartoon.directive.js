(function () {
	'use strict';
	angular.module('df.core').directive('dfCartoon', DfCartoonDirective);

	function DfCartoonDirective() {
		return {
			restrict: 'E',
			template: '<div><div ng-if="cartoonCtrl.showAdvert">Here could be your advertisement</div><ul><li ng-repeat="cartoon in cartoonCtrl.bestCartoons">{{cartoon.title}}</li></ul></div>',
			controller: 'DfCartoonController',
			controllerAs: 'cartoonCtrl'
		}
	}
})();
