angular
	.module('myApp')
	.factory('members',['$http',function($http){
		var m = {members:[]};
		m.getAll = function(){
			return $http.get('/members.json').success(function(data){
				angular.copy(data,m.members);
			});
		};
		m.create = function(post){
			return $http.post('/members.json').success(function(data){
				m.members.push(data);
			});
		};
		return m;
	}])
	.controller('memberCtrl',['$scope','members',function($scope,members){
		$scope.members = members.members;
		$scope.addMember = function(){
				if(!$scope.title || $scope.title === '') { return; }
					members.create({
					name: $scope.name,
					position: $scope.position,
					promotion: $scope.promotion,
					abstract:$scope.abstract,
				});
				$scope.name = '';
				$scope.position = '';
				$scope.promotion= 0;
				$scope.abstract ='';
				};
		
	}]);