class Portofolio < ActiveRecord::Base
	has_attached_file :image, :default_url => "/images/default_:style_image.png"
	styles: { small: "64x64", med: "100x100", large: "200x200" }
	validates_attachment_content_type :image, content_type: ["image/jpeg", "image/png","image/jpg"]
end
