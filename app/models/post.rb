class Post < ActiveRecord::Base
	belongs_to :user
	has_many :comments,	dependent: :destroy #to destroy a post and all its comments
	# Adding votable feature
	acts_as_votable
	# Overriding the json method so that post reprensatation include them
	def as_json(options = {})
		super(options.merge(include: [:user, comments: {include: :user}]))
	end
end
