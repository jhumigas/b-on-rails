(function(){
	'use strict';
	
	angular
		.module('myApp')
		.controller('blogItemCtrl',blogItemCtrl);


	/**
	 * This Controller manages a Single post object, using posts factory
	 * It manages the templates/blog-item.html.erb
	 * @param posts
	 * @param $stateParams
	 * @param $state
     */
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
		blogItem.init = init;
		blogItem.editionEnabled = false; //editable state
		blogItem.incrementUpvotes = incrementUpvotes;
		blogItem.update = update;
		blogItem.deletePost = deletePost;
		blogItem.addComment = addComment;
		blogItem.deleteComment = deleteComment;

		/**
		 * Fetches the selected object post
		 */
		function init(){
			blogItem.post = posts.get($stateParams.idpost).then(function(response){
				blogItem.post = response.data;
			});
		}
		//blogItem.post = $stateParams.post;
		/**
		 * Adds one vote to a post
		 * @param post
		 */
		function incrementUpvotes(post){
			posts.upvote(post);
		}

		/**
		 * Updates a post given a new title, abstract and/or body
		 */
		function update(){
			if(blogItem.post !== null)	{
			posts.update(blogItem.post.id, {
				title: blogItem.post.title,
				abstract: blogItem.post.abstract,
				body: blogItem.post.body
				}).success(function(res){
				   blogItem.editionEnabled = false;
				});
			}
		}

		/**
		 * Deletes one post
		 */
		function deletePost(){
			posts.delete(blogItem.post.id);
			$state.go('blog');
		}

		/**
		 * Attaches a new comment to a post
		 * A comment only needs a body to be added
		 */
		function addComment(){
			if(blogItem.body === '') { return; }
			posts.addComment(blogItem.post.id, {
				body: blogItem.body
			}).success(function(comment) {
				blogItem.post.comments.push(comment);
			});
			blogItem.body = '';
			}

		/**
		 * Deletes one comment attached to a post
         * As a comment is attached to a post, the post owning the comment is mandatory to perform the delete operation
		 * @param comment: a comment object from which the id is extracted
		 * @param post: the post owning the comment
		 * @param index: the rank of the comment in the comment's array
		 */
		function deleteComment(comment,post,index){
			posts.deleteComment(post.id,comment.id).success(function(){
				blogItem.post.comments.splice(index,1);
			});
		}
	}
})();
