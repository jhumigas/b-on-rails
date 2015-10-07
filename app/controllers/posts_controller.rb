class PostsController < ApplicationController
	before_filter :authenticate_user!, only: [:create, :upvote, :update]
	def index
		respond_with Post.all
	end
	def show
		respond_with Post.find(params[:id])
	end
	def create
		respond_with Post.create(post_params.merge(user_id: current_user.id))
	end
	def upvote
		post= Post.find(params[:id])
		post.increment!(:upvotes)
		respond_with post
	end
	def update
		respond_with Post.update(params[:id], post_params)
	end
	def destroy
		respond_with Post.destroy(params[:id])
	end

	private
	def post_params
		params.require(:post).permit(:title,:abstract,:body)
	end
end
