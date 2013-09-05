angular.module('cupcakeDashboard', ['ngResource', 'ui.state', 'angular-tools.persona',
                                    'angular-flash.service', 'angular-flash.flash-alert-directive'])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('base', {
        url: '/',
        templateUrl: 'views/themes.html',
        controller: 'ThemesCtrl'
      })
        .state('theme', {
          url: '/theme/:id',
          templateUrl: 'views/theme.html',
          controller: 'ThemeCtrl'
        })
        .state('new-theme', {
          url: '/themes/new',
          templateUrl: 'views/themes.new.html',
          controller: 'NewThemeCtrl',
          auth: 3
        })
        .state('projects', {
          url: '/projects',
          templateUrl: 'views/projects.html',
          controller: 'ProjectsCtrl'
        })
        .state('new-project', {
          url: '/projects/new',
          templateUrl: 'views/projects.new.html',
          controller: 'NewProjectsCtrl',
          auth: 3
        })
        .state('project', {
          url: '/project/:id',
          templateUrl: 'views/project.html',
          controller: 'ProjectCtrl'
        })
          .state('project.phases', {
            url: '/:phase',
            templateUrl: 'views/project.phases.html',
            controller: 'ProjectPhasesCtrl'
          })
      .state('phase', {
        url: '/phase/:id',
        templateurl: 'views/projects.html',
        controller: 'PhaseCtrl'
      })
      .state('notAuthorized', {
        url: '/401',
        templateUrl: 'views/401.html'
      })
  })
  .run(function ($rootScope, $location, $http, AuthenticationService){
    // get session user
    AuthenticationService.authenticate();

    $rootScope.permissions = AuthenticationService.getPermissions();

    $rootScope.$watch('loggedInUser', function(){
      $rootScope.permissions = AuthenticationService.getPermissions();
    });

    $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
        // if route requires auth and user is not logged in
        if(!to.auth) to.auth = 0;
        if (!AuthenticationService.canViewLevel(to.auth)) {
          // redirect back to login
          $location.path('/401');
        }
      });
  });
