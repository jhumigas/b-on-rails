angular
	.module('myApp')
	.factory('services',['$http',function($http){
		var t ={services: []};
		t.getAll = function(){
			return $http.get('/services.json').success(function(data){
				angular.copy(data,t.services);
			});	
		};
		t.create = function(service){
			return $http.post('/services.json',service).success(function(data){
				t.services.push(data);
			});
		};
		t.delete = function(id){
			return $http.delete('/services/'+id+'.json').success(function(){
				t.getAll();
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
					typeService: $scope.typeService,
					description:$scope.description
				});
				$scope.title = '';
				$scope.typeService ='';
				$scope.description ='';
				};
	    $scope.deleteService = function(service){
			services.delete(service.id);
		};		
		
	}]);