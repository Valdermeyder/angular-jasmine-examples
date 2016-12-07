'use strict';
describe('DfCartoonService', function () {
    var DfCartoonService,
        DfCharacterServiceSpy,
        $httpBackend,
        alladinCharacter, jasmineCharacter;

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
            $httpBackend = $injector.get('$httpBackend');
        });
        alladinCharacter = {name: 'Alladin', title: "Prince"};
        jasmineCharacter = {name: 'Jasmine', title: "Princess"};
    });

    describe('#getCharacterTitles', function () {
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

    describe('#getCharacters', function () {
        var getCharactersRequest;

        beforeEach(function () {
            getCharactersRequest = $httpBackend.expect('GET', '/characters');
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should request characters from server', function () {
            getCharactersRequest.respond(200);
            DfCartoonService.getCharacters();
            $httpBackend.flush();
        });

        it('should get character from server', function () {
            var characters;
            var serverCharacters = [alladinCharacter, jasmineCharacter];
            getCharactersRequest.respond(200, serverCharacters);
            DfCartoonService.getCharacters().then(function (response) {
                characters = response.data;
            });
            $httpBackend.flush();
            expect(characters).toEqual(serverCharacters);
        });

        it('should get error when server is not reachable', function () {
            var error;
            var errorMessage = 'Not Found';
            getCharactersRequest.respond(404, errorMessage);
            DfCartoonService.getCharacters().catch(function (response) {
                error = response.data;
            });
            $httpBackend.flush();
            expect(error).toEqual(errorMessage);
        });
    });
});
