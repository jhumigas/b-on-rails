angular
	.module('myApp')
	.controller('blogItemCtrl',['$scope','posts','$stateParams','$state',function($scope,posts,$stateParams,$state){
		//for facebook-page widget
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";
			fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		
		$scope.init = function(){
			$scope.post = posts.get($stateParams.idpost).then(function(response){
				$scope.post = response.data;
			});
		};
		$scope.editionEnabled = false; //editable state
		//$scope.post = $stateParams.post;
		$scope.incrementUpvotes = function(post){
			posts.upvote(post);
		};
		$scope.update = function(){	
			if($scope.post !== null)	{
			posts.update($scope.post.id, {
				title: $scope.post.title,
				abstract: $scope.post.abstract, 
				body: $scope.post.body
				});
			$scope.editionEnabled = false;
			}	
		};
		$scope.delete = function(){
			posts.delete($scope.post.id);
			$state.go('blog');
		};
		$scope.addComment = function(){
			if($scope.body === '') { return; }
			posts.addComment($scope.post.id, {
				body: $scope.body,
			}).success(function(comment) {
				$scope.post.comments.push(comment);
			});
			$scope.body = '';
			};
		$scope.deleteComment = function(comment,post,index){
			posts.deleteComment(post.id,comment.id).success(function(){
				$scope.post.comments.splice(index,1);
			});
		};
	}]);