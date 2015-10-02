class AddAvatarToPortofolios < ActiveRecord::Migration
  def change
    add_column :portofolios, :avatar, :string
  end
end
