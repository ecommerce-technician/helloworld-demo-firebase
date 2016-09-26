/**
 * Created by alex on 7/5/16.
 */
angular.module('NodeTechApp')
.controller('RootController', function($scope, $state, $firebaseAuth, $cookies){
    $scope.$state = $state;

    var auth = $firebaseAuth();
    //console.log(auth);

    $scope.signOut = function () {
        auth.$signOut();
        $cookies.remove('tk');
        $state.go('root.home');
    }
})
