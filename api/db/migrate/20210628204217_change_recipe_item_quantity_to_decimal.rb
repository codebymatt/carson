class ChangeRecipeItemQuantityToDecimal < ActiveRecord::Migration[6.1]
  def change
    change_column :recipe_items, :quantity, :decimal
  end
end
