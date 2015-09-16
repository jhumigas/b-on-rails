angular
	.module('myApp')
	.factory('posts',['$http',function($http){
		  var o = {posts: []};
		  o.getAll = function(){
			  return $http.get('/posts.json').success(function(data){
				  angular.copy(data,o.posts);
			  });
		  };
		  o.create = function(post) {
			return $http.post('/posts.json', post).success(function(data){
				o.posts.push(data);
			});
			};
		return o;
	}
	])
	.controller('blogCtrl',['$scope','posts',function($scope,posts){
		$scope.posts= posts.posts;
			$scope.addPost = function(){
				if(!$scope.title || $scope.title === '') { return; }
					posts.create({
					title: $scope.title,
					abstract: $scope.abstract,
					body: $scope.body,
					author:$scope.author,
				});
				$scope.title = '';
				$scope.abstract = '';
				$scope.body ='';
				$scope.author ='';
				};		
	}]);