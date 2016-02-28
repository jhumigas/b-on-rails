(function(){
	'use strict';
	angular
		.module('myApp')
		.factory('services',services)
		.controller('serviceCtrl',serviceCtrl);
	/**
	 * Factory managing communication to the HTTP server
 	 * @param $http
	 * @returns {{services: Array}}
     */
	function services($http){
		/**
		 *
		 * @type {{services: Array, getAll: getAll, create: create, update: update, delete: deleteService}}
         */
		var t = {
			services: [],
			getAll: getAll,
			create: create,
			update: update,
			delete: deleteService
		};

		/**
		 * Fetch all the services
		 * @returns {*}
         */
		function getAll(){
			return $http.get('/services.json').success(function(data){
				angular.copy(data,t.services);
			});
		}

		/**
		 * Create one service object
		 * @param service
         * @returns {*}
         */
		function create(service){
			return $http.post('/services.json',service).success(function(data){
				t.services.push(data);
			});
		}

		/**
		 * Updates one service object
		 * @param id : id of the service to update
		 * @param service: new updated service
         * @returns {*}
         */
		function update(id,service){
			return $http.put('/services/'+id+'.json',service).success(function(data){

			});
		}

		/**
		 * Deletes one service object
		 * @param id : id of the service to delelte
         * @returns {*}
         */
		function deleteService(id){
			return $http.delete('/services/'+id+'.json').success(function(){
				t.getAll();
			});
		}
		return t;
	}

	/**
	 * Controller to be binded to the services template i.e templates/services.html.erb
	 * @param services
     */
	function serviceCtrl(services){

		/* jshint validthis : true */
		var service =this;
		service.editableForm = false;
		service.services = services.services;
		service.addService = addService;
		service.deleteService = deleteService;
		service.update = update;

		/**
		 * Adds one service to the services array
		 */
		function addService(){
				if(!service.title || service.title === '') { return; }
					services.create({
					title: service.title,
					typeService: service.typeService,
					description:service.description
				});
				service.title = '';
				service.typeService ='';
				service.description ='';
		}

		/**
		 * Deletes a service
		 * @param item : A service object from the service array to be deleted
		 */
		function deleteService(item){
			services.delete(item.id);
		}

		/**
		 * Updates a given service
		 * @param item
		 */
		function update(item){
			services.update(item.id,{
					title: item.title,
					typeService: item.typeService,
					description: item.description
			});
			service.editableForm = false;
		}
	}
})();
