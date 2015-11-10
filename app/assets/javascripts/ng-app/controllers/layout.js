(function(){
	'use strict';
	
	angular
		.module('myApp')
		.controller('LayoutCtrl',LayoutCtrl);
		
		function LayoutCtrl($scope,Auth) {
			
			/* jshint validthis: true */
			
			var layout = this;
			layout.signedIn = Auth.isAuthenticated;
			layout.logout = Auth.logout;
			Auth.currentUser().then(function(user){
				layout.user = user;
			});
			$scope.$on('devise:new-registration', function (e, user){
				layout.user = user;
			});
			
			$scope.$on('devise:login', function (e, user){
				layout.user = user;
			});
			
			$scope.$on('devise:logout', function (e, user){
				layout.user = {};
			});
		}
	
})();

