describe('dfCartoon', function () {
	var $compile,
		$rootScope,
		directiveScope;

	beforeEach(function () {
		module('df.core');
		module(function ($provide, $controllerProvider) {
			$controllerProvider.register('DfCartoonController', function () {
			})
		});
		inject(function ($injector) {
			$compile = $injector.get('$compile');
			$rootScope = $injector.get('$rootScope');
			directiveScope = $rootScope.$new(true);
		});
	});

	describe('after compile', function () {
		it('should contains advertisement when showAdvert is enabled', function () {
			const element = $compile('<df-cartoon></df-cartoon>')(directiveScope);
			directiveScope.cartoonCtrl.showAdvert = true;
			$rootScope.$digest();
			expect(element.html()).toContain('Here could be your advertisement');
		});

		it('should contains bestCartoons titles', function () {
			const element = $compile('<df-cartoon></df-cartoon>')(directiveScope);
			const title = 'Aladdin';
			directiveScope.cartoonCtrl.bestCartoons = [{title: title}];
			$rootScope.$digest();
			expect(element.html()).toContain(title);
		});
	});
});
