class Post < ActiveRecord::Base
	belongs_to :user
	has_many :comments	
	# Overriding the json method so that post reprensatation include them
	 def as_json(options = {})
    super(options.merge(include: [:user, comments: {include: :user}]))
  end
end
