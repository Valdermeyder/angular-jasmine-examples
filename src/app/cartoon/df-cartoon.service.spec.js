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
        var alladin, jasmine;

        beforeEach(function () {
            alladin = {name: 'Alladin', title: "Prince"};
            jasmine = {name: 'Jasmine', title: "Princess"};
        });

        it('should get name with title for each cartoon character', function () {
            DfCartoonService.getCharacterTitles([alladin, jasmine]);
            expect(DfCharacterServiceSpy.getNameWithTitle).toHaveBeenCalledWith(alladin);
            expect(DfCharacterServiceSpy.getNameWithTitle).toHaveBeenCalledWith(jasmine);
        });

        it('should return return titles for all cartoon characters', function () {
            DfCharacterServiceSpy.getNameWithTitle.and.returnValues('Prince Alladin', 'Princess Jasmine');
            expect(DfCartoonService.getCharacterTitles([alladin, jasmine])).toBe('Prince Alladin, Princess Jasmine');
        });
    });
});
