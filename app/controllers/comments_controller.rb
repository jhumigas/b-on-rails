class CommentsController < ApplicationController
	before_filter :authenticate_user!, only: [:create, :upvote]
	def create
		post= Post.find(params[:post_id])
		comment=post.comments.create(comment_params)
		respond_with post,comment
	end
	def destroy
		post= Post.find(params[:post_id])
		comment=post.comments.destroy(params[:id])
		respond_with post,comment
	end
	private
	def comment_params
		params.require(:comment).permit(:body,:author)
	end
end
