(function(){
	'use strict';
	
	angular
		.module('myApp')
		.controller('LayoutCtrl',LayoutCtrl);

	/**
	 * The Layout Controller manages the templates/layout.html.erb
	 * Inside the layout reside all the children states for example home, about, etc
	 * @param $scope
	 * @param Auth
	 * @constructor
     */
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

