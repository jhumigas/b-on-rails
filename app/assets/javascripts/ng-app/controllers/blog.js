(function(){
	'use strict';
	angular
		.module('myApp')
		.factory('posts',posts)
		.controller('blogCtrl',blogCtrl);

    /**
	 * The Posts Factory is wired to the Posts rails controller located in app/controllers/posts_controller.rb
	 * Hence, a post JSON object is {title : string, abstract : string, body: string}
	 * @param $http core Angular Service to communicate to remote HTTP servers
	 * @returns {{posts: Array, numberOfPages: number}}
     */
	function posts($http){
		var o = {
			posts: [],
			numberOfPages : 0,
			getAll: getAll,
			create: create,
			upvote: upvote,
			get: get,
			getPage: getPage,
			getNumberOfPages: getNumberOfPages,
			update: update,
			delete: deletePost,
			addComment: addComment,
			deleteComment: deleteComment
		};

		function getAll(){
			return $http.get('/posts.json').success(function(data){
				angular.copy(data,o.posts);
			});
		}
		function create(post) {
			return $http.post('/posts.json', post).success(function(data){
				o.posts.push(data);
			});
		}
		function upvote(post){
			return $http.put('/posts/'+post.id+'/upvote.json').then(function(response){
				post = o.get(post.id);
			});
		}
		function get(id){
			return $http.get('/posts/'+id+'.json').success(function(data){
				return data;
			});
		}
		function getPage(page){
			return $http.get('/posts/page/'+page+'.json').success(function(data){
				angular.copy(data,o.posts);
			});
		}
		function getNumberOfPages(){
			return $http.get('/posts/paginate/numberofpages.json').success(function(data){
				o.numberOfPages = data;
				return data;
			});
		}
		function update(id,post){
			return $http.put('/posts/'+id+'.json',post);
		}
		function deletePost(id){
			return $http.delete('/posts/'+id+'.json').then(function(res){
				o.getAll();
				return res;
			});
		}
		function addComment(id,comment){
			return $http.post('/posts/'+id+'/comments.json',comment);
		}
		function deleteComment(id,idcomment){
			return $http.delete('/posts/'+id+'/comments/'+idcomment+'.json');
		}
		/* TODO: editComment service */
		return o;
	}

	/**
	 * The blogCtrl manages the blog template located in templates/blog.html.erb
	 * @param posts Factory providing Posts services such as get a post, get a page of posts, etc
	 * @param $stateParams provides a specific url object that was navigated to
	 * @param $state
     */
	function blogCtrl(posts,$stateParams,$state){

		/* jshint validthis: true */
		var blog = this;
		blog.numberOfPages = posts.numberOfPages;
		blog.numberPages = [];
		blog.currentPage = 1;
		blog.initNumberOfPages = initNumberOfPages;
		blog.initCurrentPage = initCurrentPage;
		blog.posts= posts.posts;
		blog.addPost = addPost;

		/**
		 * Fetch number of post pages used to generate links
		 */
		function initNumberOfPages(){
			for(var i = 0; i < blog.numberOfPages;i++){
				blog.numberPages.push(i);
			}
		}

		/**
		 * Fetches current posts page number
		 */
		function initCurrentPage(){
			blog.currentPage= parseInt($stateParams.page);
		}

		/**
		 * Add a new post item
		 * Reset the to-be-added post to an empty blog
		 */
		function addPost(){
			if(!blog.title || blog.title === '') { return; }
				posts.create({
				title: blog.title,
				abstract: blog.abstract,
				body: blog.body
			});
			blog.title = '';
			blog.abstract = '';
			blog.body ='';
		}
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