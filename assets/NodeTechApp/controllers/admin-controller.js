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
