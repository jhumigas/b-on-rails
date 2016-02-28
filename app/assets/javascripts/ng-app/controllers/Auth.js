(function(){
	'use strict';
	
	angular
		.module('myApp')
		.controller('AuthCtrl', AuthCtrl);
		/**
         * AuthCtrl manages the authentification feature and manages templates/login.html.erb
         * Uses angular-devise module
         */
    function AuthCtrl($state,Auth){
        
        /* jshint validthis: true */
        var authCtrl = this;
        authCtrl.login = login;
        authCtrl.register = register;
        
        /**
         * Called when logging in
         */
        function login() {
            Auth.login(authCtrl.user).then(function(){
            $state.go('home');
            });
        }
        /**
         * Called when registering a new user
         * Deactivated by default in the template
         */
        function register() {
            Auth.register(authCtrl.user).then(function(){
            $state.go('home');
            });
        }
    }
})();