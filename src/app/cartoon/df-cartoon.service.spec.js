'use strict';
describe('DfCartoonService', function () {
    var DfCartoonService,
        DfCharacterServiceSpy;

    beforeEach(function () {
        module('df.core');
        module(function ($provide) {
            $provide.service('DfCharacterService', function () {
                this.getNameWithTitle = jasmine.createSpy('getNameWithTitle');
            })
        });
        inject(function ($injector) {
            DfCartoonService = $injector.get('DfCartoonService');
            DfCharacterServiceSpy = $injector.get('DfCharacterService');
        });
    });

    describe('#getCharacterTitles', function () {
        var alladinCharacter, jasmineCharacter;

        beforeEach(function () {
            alladinCharacter = {name: 'Alladin', title: "Prince"};
            jasmineCharacter = {name: 'Jasmine', title: "Princess"};
        });

        it('should get name with title for each cartoon character', function () {
            DfCartoonService.getCharacterTitles([alladinCharacter, jasmineCharacter]);
            expect(DfCharacterServiceSpy.getNameWithTitle).toHaveBeenCalledWith(alladinCharacter);
            expect(DfCharacterServiceSpy.getNameWithTitle).toHaveBeenCalledWith(jasmineCharacter);
        });

        it('should return return titles for all cartoon characters', function () {
            DfCharacterServiceSpy.getNameWithTitle.and.returnValues('Prince Alladin', 'Princess Jasmine');
            expect(DfCartoonService.getCharacterTitles([alladinCharacter, jasmineCharacter]))
                .toBe('Prince Alladin, Princess Jasmine');
        });
    });
});
