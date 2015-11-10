(function(){
	'use strict';
	
	angular
		.module('myApp')
		.controller('blogItemCtrl',blogItemCtrl);
		
		function blogItemCtrl(posts,$stateParams,$state){
			//for facebook-page widget
			(function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";
				fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));
			
			/* jshint validthis: true */
			var blogItem = this;
			
			blogItem.init = function(){
				blogItem.post = posts.get($stateParams.idpost).then(function(response){
					blogItem.post = response.data;
				});
			};
			blogItem.editionEnabled = false; //editable state
			//blogItem.post = $stateParams.post;
			blogItem.incrementUpvotes = function(post){
				posts.upvote(post);
			};
			blogItem.update = function(){	
				if(blogItem.post !== null)	{
				posts.update(blogItem.post.id, {
					title: blogItem.post.title,
					abstract: blogItem.post.abstract, 
					body: blogItem.post.body
					});
				blogItem.editionEnabled = false;
				}	
			};
			blogItem.delete = function(){
				posts.delete(blogItem.post.id);
				$state.go('blog');
			};
			blogItem.addComment = function(){
				if(blogItem.body === '') { return; }
				posts.addComment(blogItem.post.id, {
					body: blogItem.body,
				}).success(function(comment) {
					blogItem.post.comments.push(comment);
				});
				blogItem.body = '';
				};
			blogItem.deleteComment = function(comment,post,index){
				posts.deleteComment(post.id,comment.id).success(function(){
					blogItem.post.comments.splice(index,1);
				});
			};
		}
})();
