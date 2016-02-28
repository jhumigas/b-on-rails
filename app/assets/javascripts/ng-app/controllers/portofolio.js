(function(){
	'use strict';
	
	angular
		.module('myApp')
		.factory('portofolios',portofolios)
		.controller('portofolioCtrl', portofolioCtrl)
		.directive('prettyp', function(){
			return function(scope, element, attrs) {
				$("[rel^='prettyPhoto']").prettyPhoto({deeplinking: false, social_tools: false});
			};
		});
	/**
	 * Portofolios is the provider of portofolios rails controller services providing CRUD operations
	 * @param $http
	 * @param Upload
	 * @returns {{portofolios: Array, getAll: getAll, create: create, delete: deletePortfolio}}
     */
	function portofolios($http,Upload){
		var o = {
			portofolios:[],
			getAll: getAll,
			create: create,
			delete: deletePortfolio
		};
		function getAll(){
			return $http.get('/portofolios.json').success(function(data){
				angular.copy(data, o.portofolios);
			});
		}
		function create(title,picFile,typeService){
			Upload.upload({
				url:'/portofolios.json',
				method: 'POST',
				fields: {'portofolio[title]':title,
						'portofolio[type_service]':typeService
						},
				file: picFile,
				fileFormDataName: 'portofolio[picture]'
			}).then(function(response){
				o.portofolios.push(response.data);
			});
		}
		function deletePortfolio(id){
			return $http.delete('/portofolios/'+id+'.json').success(function(data){
				o.getAll();
				return data;
			});
		}
		return o;
	}

	/**
	 * Portofolio manages the templates/portofolio.html.erb
	 * @param portofolios
     */
	function portofolioCtrl(portofolios){

		/* jshint validthis : true */
		var portofolio = this;
		portofolio.portofolios = portofolios.portofolios;
		portofolio.uploadPicture = uploadPicture;
		portofolio.deletePicture = deletePicture;

		/**
		 * Upload a new picture to the portofolio
		 * @param title: String
		 * @param picFile: File
		 * @param typeService : String
		 */
		function uploadPicture(title,picFile,typeService){
			portofolios.create(title,picFile,typeService);
		}

		/**
		 * Delete one picture
		 * @param portofolio : a portofolio object to be deleted
		 */
		function deletePicture(portofolio){
			portofolios.delete(portofolio.id);
		}
	}
})();