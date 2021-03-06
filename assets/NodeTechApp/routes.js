/**
 * Created by alex on 6/17/16.
 */
angular.module('NodeTechApp')
.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);  //Remove # in angular urls.

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('root', {
            url: '',
            abstract: true,
            views: {
                'header': {
                    templateUrl: 'partials/header.html',
                    controller: 'RootController'
                },
                'footer':{
                    templateUrl: 'partials/footer.html',
                    controller: 'RootController'
                }
            },
            authenticate: false
        })
        .state('root.home', {
            url: '/',
            views: {
                'container@': {
                    templateUrl: 'partials/home.html'
                }
            },
            authenticate: false
        })
        .state('root.login', {
            url: '/login',
            views: {
                'container@': {
                    templateUrl: 'partials/login.html',
                    controller: 'LoginController'
                }
            },
            authenticate: false
        })
        .state('root.admin', {
            url: '/admin',
            views: {
                'container@': {
                    templateUrl: 'partials/admin.html',
                    controller: 'AdminController'
                }
            },
            admin: true
        })
        .state('root.signup', {
            url: '/signup',
            views: {
                'container@': {
                    templateUrl: 'partials/login.html',
                    controller: 'LoginController'
                }
            },
            authenticate: false
        })
        .state('root.confirm', {
            url: '/confirm',
            views: {
                'container@' : {
                    templateUrl: 'partials/confirm.html',
                    controller: 'ConfirmController'
                }
            },
            authenticate: true
        })
}]);
