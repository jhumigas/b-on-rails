class PortofoliosController < ApplicationController
    def index
		respond_with Portofolio.all
	end
	def show
		respond_with Portofolio.find(params[:id])
	end
	def create
		respond_with Portofolio.create(portofolio_params)
	end
	def update
		respond_with Portofolio.update(params[:id], params[:portofolio])
	end
	def destroy
		respond_with Portofolio.destroy(params[:id])
	end
	private
	def portofolio_params
		params.require(:portofolio).permit(:title,:image)
	end

end
