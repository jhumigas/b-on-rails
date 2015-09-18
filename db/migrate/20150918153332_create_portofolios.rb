class CreatePortofolios < ActiveRecord::Migration
  def change
    create_table :portofolios do |t|
      t.string :title
      t.attachment :image

      t.timestamps null: false
    end
  end
end
