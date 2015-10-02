class PortofoliosController < ApplicationController
    def index
		respond_with Portofolio.all
	end
	def show
		respond_with Portofolio.find(params[:id])
	end
	def create
	    p = Portofolio.new(portofolio_params)
		p.picture = params[:file]
	    p.save!
		respond_with p
	end
	def update
		respond_with Portofolio.update(params[:id], params[:portofolio])
	end
	def destroy
		respond_with Portofolio.destroy(params[:id])
	end
	
	private
	def portofolio_params
		params.require(:portofolio).permit(:picture,:title,:type_service)
	end
	def as_json(options={})
	    {:id => self.id, :title => self.title, :typeService =>self.type_service, :pictureUrl => self.picture.url}
	end
end
