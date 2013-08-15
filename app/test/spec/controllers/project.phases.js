'use strict';

describe('Controller: ProjectPhasesCtrl', function () {

  // load the controller's module
  beforeEach(module('nodeTestApp'));

  var ProjectPhasesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProjectPhasesCtrl = $controller('ProjectPhasesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
