class CreatePortofolios < ActiveRecord::Migration
  def change
    create_table :portofolios do |t|
      t.string :title
      t.string :picture

      t.timestamps null: false
    end
  end
end
