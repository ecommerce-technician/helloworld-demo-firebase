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
    .run(function ($rootScope, $state, $cookies) {
        "use strict";

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
                $cookies.remove('tk');
            }
        });

        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){

        });

        $rootScope.$on('$stateChangeSuccess', function (toState, toParams, fromState, fromParams) {
            //console.log('state change success',toState);
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            //console.error('state change error', error);
        });
    })
