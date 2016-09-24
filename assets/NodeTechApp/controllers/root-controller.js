/**
 * Created by alex on 7/5/16.
 */
angular.module('NodeTechApp')
.controller('RootController', function($scope, $state, $firebaseAuth){
    $scope.$state = $state;

    var auth = $firebaseAuth();
    //console.log(auth);

    $scope.signOut = function () {
        auth.$signOut();
        $state.go('root.home');
        //.then(function () {
        //     $state.go('root.index');
        //     console.log('logged out');
        // }).catch(function (error) {
        //     console.log("logout failed:", error);
        // });
    }
})
