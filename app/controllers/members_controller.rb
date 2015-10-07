class MembersController < ApplicationController
	before_filter :authenticate_user!, only: [:create, :update, :destroy]
	def index
		respond_with Member.all
	end
	def show
		respond_with Member.find(params[:id])
	end
	def create
		m = Member.new(member_params)
		m.avatar = params[:file]
		m.save!
		respond_with m
	end
	def update
		respond_with Member.update(params[:id], member_params)
	end
	def destroy
		respond_with Member.destroy(params[:id])
	end

	private
	def member_params
		params.require(:member).permit(:avatar,:name,:position,:promotion,:abstract)
	end
	def as_json(options={})
	    {:id => self.id, :name => self.name, :position =>self.position, :promotion => self.promotion, :abstract => self.abstract, :avatarUrl => self.avatar.url}
	end
end
