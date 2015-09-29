class MembersController < ApplicationController
	before_filter :authenticate_user!, only: [:create, :update, :destroy]
	def index
		respond_with Member.all
	end
	def show
		respond_with Member.find(params[:id])
	end
	def create
		respond_with Member.create(member_params)
	end
	def update
		respond_with Member.update(params[:id], params[:member])
	end
	def destroy
		respond_with Member.destroy(params[:id])
	end

	private
	def member_params
		params.require(:member).permit(:name,:position,:promotion,:abstract)
	end
end
