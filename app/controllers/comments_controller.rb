class CommentsController < ApplicationController
	def create
		post= Post.find(params[:post_id])
		comment=post.comments.create(comment_params)
		respond_with post,comment
	end
	def destroy
	 	respond_with Comment.destroy(params[:id])
	end
	private
	def comment_params
		params.require(:comment).permit(:body,:author)
	end
end
