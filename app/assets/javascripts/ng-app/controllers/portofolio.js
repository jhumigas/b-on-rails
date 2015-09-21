angular
	.module('myApp')
	.factory('portofolios',['$http',function($http){
		var o = {portofolios:[]};
		o.create = function(portofolio){
			return $http.post('/portofolios.json',portofolio).success(function(data){
				return data;
			});
		};
		return o;
		
	}])
	.controller('portofolioCtrl',['$scope','portofolios',function($scope,portofolios){
		$scope.addPortofolio = function(){
			if(!$scope.title || $scope.title ===''){return;}
			portofolios.create({
				title: $scope.title,
				image: $scope.image
			});
		};
	}]);