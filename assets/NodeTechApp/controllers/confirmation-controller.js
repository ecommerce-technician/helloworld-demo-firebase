/**
 * Created by alex on 7/8/16.
 */
angular.module('NodeTechApp')
    .controller('ConfirmationController', function($timeout, $scope, $sce){
    })
    .filter('numKeys', function() {
        return function(json) {
            var keys = Object.keys(json)
            return keys.length;
        }
    })