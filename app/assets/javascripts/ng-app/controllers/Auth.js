(function(){
	'use strict';
	
	angular
		.module('myApp')
		.controller('AuthCtrl', AuthCtrl);
		
		function AuthCtrl($state,Auth){
			
			/* jshint validthis: true */
			var authCtrl = this;
			authCtrl.login = login;
            authCtrl.register = register;
            
            
            function login() {
				Auth.login(authCtrl.user).then(function(){
				$state.go('home');
				});
			}
	
            function register() {
				Auth.register(authCtrl.user).then(function(){
				$state.go('home');
				});
			}
		}
})();