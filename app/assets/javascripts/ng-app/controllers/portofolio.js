angular
	.module('myApp')
	.factory('portofolios',['$http','Upload',function($http,Upload){
		var o = {portofolios:[]};
		o.create = function(portofolio){
			return $http.post('/portofolios.json',portofolio).success(function(data){
				return data;
			});
		};
		o.createWithImage=function(title,file){
			Upload.upload({
				url:'/portofolios.json',
				method: 'POST',	
				fields: {'portofolio[title]':title},
				file: file,
				fileFormDataName: 'portofolio[image]'
			});
		};
		return o;
		
	}])
	.controller('portofolioCtrl',['$scope','portofolios',function($scope,portofolios){
		$scope.addPortofolio = function(){
			if(!$scope.title || $scope.title ===''){return;}
			portofolios.create({
				title: $scope.title,
				image: $scope.file
			});
		};
		$scope.uploadPicture = function(title,file){
			portofolios.createWithImage(title,file);
		};
	}]);