(function(){
	'use strict';
	
	angular
		.module('myApp')
		.controller('AuthCtrl', AuthCtrl);
		
		function AuthCtrl($state,Auth){
			
			/* jshint validthis: true */
			var authCtrl = this;
			authCtrl.login = function() {
				Auth.login(authCtrl.user).then(function(){
				$state.go('home');
				});
			};
	
			authCtrl.register = function() {
				Auth.register(authCtrl.user).then(function(){
				$state.go('home');
				});
			};
		}
})();
