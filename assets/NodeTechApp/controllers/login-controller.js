/**
 * Created by alex on 7/5/16.
 */
angular.module('NodeTechApp')
.controller('LoginController', function($scope, $state, $firebaseAuth){
    var auth = $firebaseAuth();
    var database = firebase.database();
    $scope.$state = $state;

    $scope.signIn = function () {
        $scope.signInDisabled = true;

        // login with Email / Password
        auth.$signInWithEmailAndPassword($scope.email, $scope.password).then(function (firebaseUser) {
            $scope.email = '';
            $scope.password = '';
            if(firebaseUser.uid) {
                $state.go('root.confirm');
            }
        }).catch(function (error) {
            $scope.signInDisabled = false;
            alert("Authentication failed:", error.message);
        });
    }

    $scope.address = {
        streetNumber: null,
        street: null,
        city: null,
        state: null,
        zip: null
    }

    $scope.signUp = function () {
        $scope.signUpDisabled = true;

        // login with Email / Password
        auth.$createUserWithEmailAndPassword($scope.email, $scope.password).then(function (firebaseUser) {
            var datetime = new Date().getTime();
            $scope.email = '';
            $scope.password = '';
            if(firebaseUser.uid) {
                var userRef = database.ref('users/'+ firebaseUser.uid);
                userRef.set({
                    first_name: $scope.first_name,
                    last_name: $scope.last_name,
                    email: firebaseUser.email,
                    address : {
                        streetNumber: $scope.streetNumber,
                        street: $scope.street,
                        city: $scope.city,
                        state: $scope.state,
                        zip: $scope.zip
                    },
                    datetime: datetime
                }).then(function() {
                    $state.go('root.confirm');
                });
            }
        }).catch(function (error) {
            $scope.signInDisabled = false;
            alert("Authentication failed:", error.message);
        });
    }



    $scope.reset = function () {
        // login with Email / Password
        auth.$sendPasswordResetEmail($scope.data.email).then(function () {
            alert("reset sent!");
        }).catch(function (error) {
            console.log(error);
            alert("reset failed:", error.message);
        });
    }


    $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
        console.log($scope.autocomplete.getPlace().address_components);
        var place = $scope.autocomplete.getPlace();
        var components = place.address_components;
        for (var i = 0, component; component = components[i]; i++) {
            if (component.types[0] == 'street_number') {
                $scope.streetNumber = component['long_name'];
            }
            if (component.types[0] == 'route') {
                $scope.street = component['long_name'];
            }
            if (component.types[0] == 'locality') {
                $scope.city = component['long_name'];
            }
            if (component.types[0] == 'administrative_area_level_1') {
                $scope.state = component['long_name'];
            }
            if (component.types[0] == 'postal_code') {
                $scope.zip = component['long_name'];
            }
        }
        $scope.$apply();
    });
})
