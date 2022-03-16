class AddServingsAndCaloriesToRecipe < ActiveRecord::Migration[6.1]
  def change
    add_column :recipes, :servings, :integer
    add_column :recipes, :calories, :integer
  end
end
