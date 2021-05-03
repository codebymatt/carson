class AddIndexToItemName < ActiveRecord::Migration[6.1]
  def change
    add_index :items, [:name, :unit]
  end
end
