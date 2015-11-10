(function(){
	'use strict';
	angular
		.module('myApp')
		.factory('posts',posts)
		.controller('blogCtrl',blogCtrl);
		
		function posts($http){
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
					return $http.put('/posts/'+post.id+'/upvote.json').then(function(response){
						post = o.get(post.id);
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
		function blogCtrl(posts,$state){
			
			/* jshint validthis: true */
			var blog = this;
			
			blog.posts= posts.posts;
			blog.addPost = function(){
				if(!blog.title || blog.title === '') { return; }
					posts.create({
					title: blog.title,
					abstract: blog.abstract,
					body: blog.body,
				});
				blog.title = '';
				blog.abstract = '';
				blog.body ='';
				};
				//for facebook-page widget
				(function(d, s, id) {
					var js, fjs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) return;
					js = d.createElement(s); js.id = id;
					js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";
					fjs.parentNode.insertBefore(js, fjs);
					}(document, 'script', 'facebook-jssdk'));
							
		}
})();