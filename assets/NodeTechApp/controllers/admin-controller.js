angular.module('NodeTechApp')
    .controller('AdminController', function($timeout, $scope, $sce){
        $scope.users = [];
        var usersRef = firebase.database().ref('users');
        usersRef.once('value').then(function(snapshot) {
            $scope.users.push(snapshot.val());
            angular.forEach(snapshot.val(), function(value, key){
                $scope.users.push(value);
            });
            $scope.$apply();
        });
    })
