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
		function portofolios($http,Upload){
			var o = {portofolios:[]};
			o.getAll = function(){
				return $http.get('/portofolios.json').success(function(data){
					angular.copy(data, o.portofolios);
				});
			};
			o.create=function(title,picFile,typeService){
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
			};
			o.delete = function(id){
				return $http.delete('/portofolios/'+id+'.json').success(function(data){
					o.getAll();
					return data;
				});
			};
			return o;
		}
		function portofolioCtrl(portofolios){
			
			/* jshint validthis : true */
			var portofolio = this;
			portofolio.portofolios = portofolios.portofolios;
			portofolio.uploadPicture = function(title,picFile,typeService){
				portofolios.create(title,picFile,typeService);
			};
			portofolio.delete = function(portofolio){
				portofolios.delete(portofolio.id);
			};
			
		}
})();