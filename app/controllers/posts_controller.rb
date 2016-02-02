class PostsController < ApplicationController
	before_filter :authenticate_user!, only: [:create, :upvote, :update]
	def index
		respond_with Post.all
	end
    def get_page
        respond_with Post.paginate(:page => params[:page], :per_page => 10)
    end
    def get_number_of_pages
        respond_with ((Post.count).to_f/10).ceil
    end
	def show
		respond_with Post.find(params[:id])
	end
	def create
		respond_with Post.create(post_params.merge(user_id: current_user.id))
	end
	def upvote
		post= Post.find(params[:id])
		post.upvote_by current_user
		post[:upvotes] = post.get_upvotes.size
		respond_with post.save
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
