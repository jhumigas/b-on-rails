angular
	.module('myApp')
	.factory('members',['$http','Upload',function($http,Upload){
		var m = {members:[]};
		m.getAll = function(){
			return $http.get('/members.json').success(function(data){
				angular.copy(data,m.members);
			});
		};
		m.create = function(member){
			Upload.upload({
				url:'/members.json',
				method: 'POST',	
				fields: {'member[name]':member.name,
				         'member[position]':member.position,
						 'member[promotion]':member.promotion,
						 'member[abstract]':member.abstract
						},
				file: member.avatar,
				fileFormDataName: 'member[avatar]'
			}).then(function(response){
				m.members.push(response.data);
			});
		};
		m.update = function(id,member){
			return $http.put('/members/'+id+'.json',member).success(function(res){
				
			});
		};
		m.delete = function(id){
			return $http.delete('/members/'+id+'.json').success(function(data){
				m.getAll();
				return data;
			});
		};
		return m;
	}])
	.controller('memberCtrl',['$scope','members',function($scope,members){
		$scope.members = members.members;
		$scope.newMember = null;
		$scope.addMember = function(member){
			members.create(member);
				};
		$scope.deleteMember= function(member){
			members.delete(member.id);
		};
		
	}]);