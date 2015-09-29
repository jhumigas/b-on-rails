class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.text :abstract
      t.text :body
      t.integer :upvotes

      t.timestamps null: false
    end
  end
end
