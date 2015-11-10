(function(){
	'use strict';
	
	angular
		.module('myApp')
		.factory('services',services)
		.controller('serviceCtrl',serviceCtrl);
		
		
		
		function services($http){
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
			t.update = function(id,service){
				return $http.put('/services/'+id+'.json',service).success(function(data){
					
				});
			};
			t.delete = function(id){
				return $http.delete('/services/'+id+'.json').success(function(){
					t.getAll();
				});
			};
			return t;
		}
		function serviceCtrl(services){
			
			/* jshint validthis : true */
			var service =this;
			service.editableForm = false;
			service.services = services.services;
			service.addService = function(){
					if(!service.title || service.title === '') { return; }
						services.create({
						title: service.title,
						typeService: service.typeService,
						description:service.description
					});
					service.title = '';
					service.typeService ='';
					service.description ='';
					};
			service.deleteService = function(item){
				services.delete(item.id);
			};	
			service.update = function(item){
				services.update(item.id,{
						title: item.title,
						typeService: item.typeService,
						description: item.description
				});
				service.editableForm = false;
			};	
			
		}
})();
