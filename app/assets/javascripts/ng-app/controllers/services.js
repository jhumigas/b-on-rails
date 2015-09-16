angular
	.module('myApp')
	.factory('services',['$http',function($http){
		var t ={services: []};
		t.getAll = function(){
			return $http.get('/services.json').success(function(data){
				angular.copy(data,t.services);
			});	
		};
		t.create = function(post){
			return $http.post('/services.json').success(function(data){
				t.services.push(data);
			});
		};
		return t;
	}])
	.controller('serviceCtrl',['$scope','services',function($scope,services){
		$scope.services = services.services;
		$scope.addService = function(){
				if(!$scope.title || $scope.title === '') { return; }
					services.create({
					title: $scope.title,
					duetime: $scope.duetime,
					typeService: $scope.typeService,
					abstract:$scope.abstract,
					description:$scope.description
				});
				$scope.title = '';
				$scope.abstract = '';
				$scope.body ='';
				$scope.author ='';
				};
		
	}]);