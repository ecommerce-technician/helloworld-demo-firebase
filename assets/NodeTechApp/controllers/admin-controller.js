/**
 * Created by alex on 9/25/16.
 */
angular.module('NodeTechApp')
    .controller('AdminController', function($scope, Users){
        Users.getUsers.success(function (data) {
            $scope.data.users = data;
        });
    })
