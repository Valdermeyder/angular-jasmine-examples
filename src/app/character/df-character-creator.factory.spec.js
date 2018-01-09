describe('DfCharacterCreatorFactory', function () {
	const name = 'Aladdin';
	const title = 'Prince';
	var DfCharacterCreatorFactory,
		DfCharacterServiceSpy;

	beforeEach(function () {
		module('df.core');
		module(function ($provide) {
			$provide.service('DfCharacterService', function () {
				this.getNameWithTitle = jasmine.createSpy('getNameWithTitle');
			});
		});
		inject(function ($injector) {
			DfCharacterCreatorFactory = $injector.get('DfCharacterCreatorFactory');
			DfCharacterServiceSpy = $injector.get('DfCharacterService');
		});
	});

	describe('on create', function () {
		it('should set name provided as argument', function () {
			const character = new DfCharacterCreatorFactory(name, title);
			expect(character.name).toBe(name)
		});

		it('should set title provided as argument', function () {
			const character = new DfCharacterCreatorFactory(name, title);
			expect(character.title).toBe(title)
		});
	});

	describe('#mergeNameAndTitle', function () {
		it('should combine title and name', function () {
			const character = new DfCharacterCreatorFactory(name, title);
			const titleAndName = 'Prince Aladdin';
			DfCharacterServiceSpy.getNameWithTitle.and.returnValue(titleAndName);
			character.mergeNameAndTitle();

			expect(DfCharacterServiceSpy.getNameWithTitle).toHaveBeenCalledWith(character);
			expect(character.nameWithTitle).toBe(titleAndName)
		});
	});
});
