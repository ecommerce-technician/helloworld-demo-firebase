/**
 * Created by alex on 7/5/16.
 */
angular.module('NodeTechApp')
.controller('LoginController', function($scope, $state, $firebaseAuth){
    var auth = $firebaseAuth();
    var database = firebase.database();
    $scope.$state = $state;

    $scope.signIn = function () {
        // login with Email / Password
        auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function (firebaseUser) {
            $scope.user.email = '';
            $scope.user.password = '';
            if(firebaseUser.uid) {
                $state.go('root.confirmation');
            }
        }).catch(function (error) {
            alert("Authentication failed:", error);
        });
    }

    $scope.user.address = {
        streetNumber: null,
        street: null,
        city: null,
        state: null,
        zip: null
    }

    $scope.admin = function () {
        $state.go('root.admin');
    }

    $scope.signUp = function () {
        // login with Email / Password
        auth.$createUserWithEmailAndPassword($scope.email, $scope.password).then(function (firebaseUser) {
            $scope.user.email = '';
            $scope.user.password = '';
            if(firebaseUser.uid) {
                var userRef = database.ref('users/'+ firebaseUser.uid);
                userRef.set({
                    first_name: $scope.user.first_name,
                    last_name: $scope.user.last_name,
                    email: firebaseUser.email,
                    address : {
                        streetNumber: $scope.user.streetNumber,
                        street: $scope.user.street,
                        city: $scope.user.city,
                        state: $scope.user.state,
                        zip: $scope.user.zip
                    }
                }).then(function() {
                    $state.go('root.confirmation');
                });
            }
        }).catch(function (error) {
            alert("Authentication failed:", error);
        });
    }



    $scope.reset = function () {
        // login with Email / Password
        auth.$sendPasswordResetEmail($scope.user.email).then(function () {
            alert("reset sent!");
        }).catch(function (error) {
            alert("reset failed:", error);
        });
    }

    $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
        var place = $scope.user.autocomplete.getPlace();
        var components = place.address_components;
        for (var i = 0, component; component = components[i]; i++) {
            if (component.types[0] == 'street_number') {
                $scope.user.treetNumber = component['long_name'];
            }
            if (component.types[0] == 'route') {
                $scope.user.street = component['long_name'];
            }
            if (component.types[0] == 'locality') {
                $scope.user.city = component['long_name'];
            }
            if (component.types[0] == 'administrative_area_level_1') {
                $scope.user.state = component['long_name'];
            }
            if (component.types[0] == 'postal_code') {
                $scope.user.zip = component['long_name'];
            }
        }
        $scope.$apply();
    });
})
