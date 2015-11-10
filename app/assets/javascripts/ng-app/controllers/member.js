(function(){
	'use strict';
	
	angular
		.module('myApp')
		.factory('members',members)
		.controller('memberCtrl',memberCtrl);
		
		
		function members($http,Upload){
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
		}
		function memberCtrl(members){
			
			/* jshint validthis: true */
			var member = this;
			member.members = members.members;
			member.newMember = null;
			member.addMember = function(newmember){
				members.create(newmember);
					};
			member.deleteMember= function(oldmember){
				members.delete(oldmember.id);
			};
			
		}
	})();