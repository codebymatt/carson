class CreateRecipeItems < ActiveRecord::Migration[6.1]
  def change
    create_table :recipe_items do |t|
      t.string :unit
      t.integer :quantity
      t.string :description
      t.belongs_to :recipe
      t.belongs_to :item

      t.timestamps
    end
  end
end
