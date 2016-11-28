describe('DfCharacterService', function () {
    var DfCharacterService;

    beforeEach(function () {
        module('df.core');
        inject(function (_DfCharacterService_) {
            DfCharacterService = _DfCharacterService_;
        });
    });

    describe('#getNameWithTitle', function () {
        it('should return full name', function () {
            var character = {name: 'Alladin', title: "Prince"};
            expect(DfCharacterService.getNameWithTitle(character)).toBe('Prince Alladin');
        });
    });
});
