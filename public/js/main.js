/**
 * Created by alex on 6/17/16.
 */
angular.module('NodeTechApp', ['ui.router', 'ngCookies','ngResource','ngMessages','ngMaterial', 'firebase', 'gm'])
    .config(['$compileProvider', function ($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|app):/);
    }])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.definePalette('primary', {
            '50': '#bdf9db',
            '100': '#77f2b6',
            '200': '#43ed9b',
            '300': '#14d577',
            '400': '#12b968',
            '500': '#0f9d58',
            '600': '#0c8148',
            '700': '#0a6539',
            '800': '#074929',
            '900': '#042d19',
            'A100': '#ffffff',
            'A200': '#77f2b6',
            'A400': '#12b968',
            'A700': '#0a6539',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 A100 A200'
        });
        $mdThemingProvider.definePalette('accent', {
            '50': '#e7eeef',
            '100': '#baced0',
            '200': '#98b7b9',
            '300': '#6e999c',
            '400': '#5f898c',
            '500': '#53777a',
            '600': '#476568',
            '700': '#3a5356',
            '800': '#2e4243',
            '900': '#213031',
            'A100': '#e7eeef',
            'A200': '#baced0',
            'A400': '#5f898c',
            'A700': '#3a5356',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': '50 100 200 300 A100 A200'
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('primary', {
                'default': '400', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            })
            .accentPalette('accent', {
                'default': '400', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            })
    })
    .config(function($mdIconProvider) {
        $mdIconProvider
            .iconSet('device', 'img/icons/sets/device-icons.svg', 24);
    })
    .run(function ($rootScope, $state, $cookies, User) {
        "use strict";

        $rootScope.user = {
            admin : false,
            email: ""
        };

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyASKttdZvCUBKGJuHncVkJUUbW9nCGcp1U",
            authDomain: "helloworld-99886.firebaseapp.com",
            databaseURL: "https://helloworld-99886.firebaseio.com",
            storageBucket: "helloworld-99886.appspot.com",
            messagingSenderId: "530581946172"
        };
        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                user.getToken().then(function(data) {
                    $cookies.put('tk', data);
                });
            } else {
                $rootScope.user.admin = "";
                $cookies.remove('tk');
            }
        });

        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
            User.getLoggedIn().success(function (data) {
                console.log(data);
                $rootScope.user.email = data.email;
                if(data.admin && data.admin == true) {
                    $rootScope.user.admin = true;
                }
                if (!toState.authenticate && !toState.admin) {
                    console.log("public");
                } else if (toState.authenticate && data.uid){
                    console.log("authenticated");
                } else if (toState.admin && data.uid && data.admin){
                    console.log("admin: " + data.admin);
                } else {
                    $state.go("root.login");
                    console.log("investigate");
                }
            });
        });

        $rootScope.$on('$stateChangeSuccess', function (toState, toParams, fromState, fromParams) {
            //console.log('state change success',toState);
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            //console.error('state change error', error);
        });
    })

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

/**
 * Created by alex on 9/25/16.
 */
angular.module('NodeTechApp')
    .controller('AdminController', function($scope, $state, Users){
        $scope.data = {};
        $scope.data.users = [];
        Users.getUsers().success(function (data) {
            if(data.admin == false) {
                $state.go('root.confirm');
            } else {
                $scope.data.users = data;
            }
        });

        //filters
        $scope.sortReverse = false; // set the default sort type

        $scope.selectUser = function (email){
            alert(email + " selected");
        }
    })

angular.module('NodeTechApp')
    .factory("Users", function ($http) {
        usersObj = {};
        usersObj.getUsers = function() {
            return $http.get('/api/v1/users')
        }
        return usersObj;
    })
    .factory("User", function ($http) {
        userObj = {};
        userObj.getLoggedIn = function() {
            return $http.get('/api/v1/user')
        }
        return userObj;
    })

/**
 * Created by alex on 7/8/16.
 */
angular.module('NodeTechApp')
    .controller('ConfirmController', function($scope){

    })

/**
 * Created by alex on 7/5/16.
 */
angular.module('NodeTechApp')
.controller('LoginController', function($scope, $state, $firebaseAuth){
    var auth = $firebaseAuth();
    var database = firebase.database();
    $scope.$state = $state;

    $scope.signIn = function () {
        $scope.signInDisabled = true;

        // login with Email / Password
        auth.$signInWithEmailAndPassword($scope.email, $scope.password).then(function (firebaseUser) {
            $scope.email = '';
            $scope.password = '';
            if(firebaseUser.uid) {
                $state.go('root.confirm');
            }
        }).catch(function (error) {
            $scope.signInDisabled = false;
            alert("Authentication failed:", error.message);
        });
    }

    $scope.address = {
        streetNumber: null,
        street: null,
        city: null,
        state: null,
        zip: null
    }

    $scope.signUp = function () {
        $scope.signUpDisabled = true;

        // login with Email / Password
        auth.$createUserWithEmailAndPassword($scope.email, $scope.password).then(function (firebaseUser) {
            var datetime = new Date().getTime();
            $scope.email = '';
            $scope.password = '';
            if(firebaseUser.uid) {
                var userRef = database.ref('users/'+ firebaseUser.uid);
                userRef.set({
                    first_name: $scope.first_name,
                    last_name: $scope.last_name,
                    email: firebaseUser.email,
                    address : {
                        streetNumber: $scope.streetNumber,
                        street: $scope.street,
                        city: $scope.city,
                        state: $scope.state,
                        zip: $scope.zip
                    },
                    datetime: datetime
                }).then(function() {
                    $state.go('root.confirm');
                });
            }
        }).catch(function (error) {
            $scope.signUpDisabled = false;
            alert("Authentication failed:", error.message);
        });
    }



    $scope.reset = function () {
        // login with Email / Password
        auth.$sendPasswordResetEmail($scope.data.email).then(function () {
            alert("reset sent!");
        }).catch(function (error) {
            console.log(error);
            alert("reset failed:", error.message);
        });
    }


    $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
        console.log($scope.autocomplete.getPlace().address_components);
        var place = $scope.autocomplete.getPlace();
        var components = place.address_components;
        for (var i = 0, component; component = components[i]; i++) {
            if (component.types[0] == 'street_number') {
                $scope.streetNumber = component['long_name'];
            }
            if (component.types[0] == 'route') {
                $scope.street = component['long_name'];
            }
            if (component.types[0] == 'locality') {
                $scope.city = component['long_name'];
            }
            if (component.types[0] == 'administrative_area_level_1') {
                $scope.state = component['long_name'];
            }
            if (component.types[0] == 'postal_code') {
                $scope.zip = component['long_name'];
            }
        }
        $scope.$apply();
    });
})

/**
 * Created by alex on 7/5/16.
 */
angular.module('NodeTechApp')
.controller('RootController', function($scope, $state, $firebaseAuth, $cookies){
    var auth = $firebaseAuth();
    $scope.$state = $state;

    //console.log(auth);

    $scope.signOut = function () {
        auth.$signOut();
        $cookies.remove('tk');
        window.location.replace('/');
    }
})