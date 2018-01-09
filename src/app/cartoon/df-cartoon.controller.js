(function () {
	'use strict';
	angular.module('df.core').controller('DfCartoonController', DfCartoonController);

	DfCartoonController.$inject = ['DfCartoonService', '$interval', '$timeout', 'DfCartonRefreshInterval',
		'DfShowAdvertTimeout'];

	function DfCartoonController(DfCartoonService, $interval, $timeout, DfCartonRefreshInterval, DfShowAdvertTimeout) {
		var dfCartoonCtrl = this;
		dfCartoonCtrl.bestCartoons = [];

		setBestCartoons();

		$interval(setBestCartoons, DfCartonRefreshInterval);

		$timeout(function () {
			dfCartoonCtrl.showAdvert = true;
		}, DfShowAdvertTimeout);

		function setBestCartoons() {
			DfCartoonService.getBestCartoons(10).then(function (bestCartoons) {
				dfCartoonCtrl.bestCartoons = bestCartoons;
			});
		}
	}
})();
