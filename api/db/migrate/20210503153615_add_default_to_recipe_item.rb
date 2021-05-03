class AddDefaultToRecipeItem < ActiveRecord::Migration[6.1]
  def change
    change_column_default :recipe_items, :multiplier, 1
  end
end
