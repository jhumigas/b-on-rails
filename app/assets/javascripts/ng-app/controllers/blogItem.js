angular
	.module('myApp')
	.controller('blogItemCtrl',['$scope','posts','$stateParams',function($scope,posts,$stateParams){
		//for facebook-page widget
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";
			fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
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