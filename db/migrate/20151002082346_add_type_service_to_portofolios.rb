class AddTypeServiceToPortofolios < ActiveRecord::Migration
  def change
    add_column :portofolios, :type_service, :string
  end
end
