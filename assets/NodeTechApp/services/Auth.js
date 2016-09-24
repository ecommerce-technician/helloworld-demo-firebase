/**
 * Created by alex on 9/7/16.
 */
angular.module('NodeTechApp')
.factory('Auth', function($firebaseAuth){
    var authFactory = {};

    var auth = $firebaseAuth();

    console.log(auth);
})