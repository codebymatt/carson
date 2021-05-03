class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :name
      t.string :unit
      t.integer :base_quantity

      t.timestamps
    end
  end
end
