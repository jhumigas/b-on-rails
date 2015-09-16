class ServicesController < ApplicationController

	def index
		respond_with Service.all
	end
	def show
		respond_with Service.find(params[:id])
	end
	def create
		respond_with Service.create(post_params)
	end
	def update
		respond_with Service.update(params[:id], params[:service])
	end
	def destroy
		respond_with Service.destroy(params[:id])
	end
	private
	def service_params
		params.require(:service).permit(:title,:duetime,:typeService,:abstract,:description)
	end
end
