class Post < ActiveRecord::Base
	has_many :comments
	# Overriding the json method so that post reprensatation include them
	def as_json(options = {})
		super(options.merge(include: :comments))
	end
end
