(function(){
	'use strict';
	
	angular
		.module('myApp')
		.factory('members',members)
		.controller('memberCtrl',memberCtrl);

	/**
	 * Members is the factory wired to the rails controllers members_controller
	 * A member JSONObject :  {name: string, position: string, promotion: int, abstract: string}
	 * Members is an array of member JSON objects
 	 * @param $http
	 * @param Upload
	 * @returns {{members: Array, getAll: getAll, create: create, update: update, delete: deleteMember}}
     */
	function members($http,Upload){
		var m = {
			members:[],
			getAll: getAll,
			create: create,
			update: update,
			delete: deleteMember
		};
		function getAll(){
			return $http.get('/members.json').success(function(data){
				angular.copy(data,m.members);
			});
		}
		function create(member){
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
		}
		function update(id,member){
			return $http.put('/members/'+id+'.json',member).success(function(res){

			});
		}
		function deleteMember(id){
			return $http.delete('/members/'+id+'.json').success(function(data){
				m.getAll();
				return data;
			});
		}
		return m;
	}

	/**
	 * MemberCtrl manages the templates/about.html.erb
	 * @param members: The provide of members services
     */
	function memberCtrl(members){
		/* jshint validthis: true */
		var member = this;
		member.members = members.members;
		member.newMember = null;
		member.addMember = addMember;
		member.deleteMember= deleteMember;

		/**
		 * Add a new member to the database
		 * @param newmember : A membe object
		 */
		function addMember(newmember){
			members.create(newmember);
		}

		/**
		 * Delete a member
		 * @param oldmember : a member object
		 */
		function deleteMember(oldmember){
			members.delete(oldmember.id);
		}
		/* TODO: updateMember function */
	}
})();