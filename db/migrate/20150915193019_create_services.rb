class CreateServices < ActiveRecord::Migration
  def change
    create_table :services do |t|
      t.string :title
      t.date :duetime
      t.integer :type
      t.text :abstract
      t.text :description

      t.timestamps null: false
    end
  end
end
