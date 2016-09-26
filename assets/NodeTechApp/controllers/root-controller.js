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
        $state.go('root.home');
    }
})
