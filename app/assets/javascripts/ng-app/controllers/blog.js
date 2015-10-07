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
			o.upvote = function(post){
				return $http.put('/posts/'+post.id+'/upvote.json').success(function(data){
					post.upvotes +=1;
				});
			};
			o.get =function(id){
				return $http.get('/posts/'+id+'.json').success(function(data){
					return data;
				});
			};
			o.update = function(id,post){
				return $http.put('/posts/'+id+'.json',post).success(function(res){	
				});
			};
			o.delete = function(id){
				return $http.delete('/posts/'+id+'.json').then(function(res){
					o.getAll();
					return res;
				});
			};
			o.addComment = function(id,comment){
				return $http.post('/posts/'+id+'/comments.json',comment);
			};
			o.deleteComment = function(id,idcomment){
				return $http.delete('/posts/'+id+'/comments/'+idcomment+'.json');
				};
		return o;
	}
	])
	.controller('blogCtrl',['$scope','posts','$state',function($scope,posts,$state,post){
		$scope.posts= posts.posts;
		$scope.addPost = function(){
			if(!$scope.title || $scope.title === '') { return; }
				posts.create({
				title: $scope.title,
				abstract: $scope.abstract,
				body: $scope.body,
			});
			$scope.title = '';
			$scope.abstract = '';
			$scope.body ='';
			};
			//for facebook-page widget
			(function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";
				fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));
						
	}]);