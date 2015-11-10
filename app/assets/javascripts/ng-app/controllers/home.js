(function(){
    'use strict';
    
    angular
        .module('myApp')
        .controller('HomeCtrl',HomeCtrl);
        
        function HomeCtrl($scope) {
            $scope.things = ['Angular', 'Rails 4.1', 'UI Router', 'Together!!'];
        }
    
})();
