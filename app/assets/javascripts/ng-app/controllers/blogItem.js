angular
	.module('myApp')
	.controller('blogItemCtrl',['$scope','posts','$stateParams',function($scope,posts,$stateParams){
		$scope.post = $stateParams.post;
		$scope.incrementUpvotes = function(post){
			posts.upvote(post);
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