class ServicesController < ApplicationController
    before_filter :authenticate_user!, only: [:create, :update, :destroy]
	def index
		respond_with Service.all
	end
	def show
		respond_with Service.find(params[:id])
	end
	def create
		respond_with Service.create(service_params)
	end
	def update
		respond_with Service.update(params[:id], service_params)
	end
	def destroy
		respond_with Service.destroy(params[:id])
	end
	private
	def service_params
		params.require(:service).permit(:title,:typeService,:description)
	end
end
