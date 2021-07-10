# frozen_string_literal: true

# Holds behaviour and data for recipe items.
class RecipeItem < ApplicationRecord
  include CarsonModel

  belongs_to :recipe
  belongs_to :item

  validates :recipe_id, :item_id, :unit, :quantity, presence: true
  validates_numericality_of :quantity, greater_than: 0

  delegate :name, to: :item

  def full_description
    base_description = "#{quantity} #{unit} #{name}"
    additional_description = description.present? ? "(#{description})" : ""

    "#{base_description} #{additional_description}"
  end

  def serialize
    {
      id: id,
      name: name,
      quantity: quantity,
      unit: unit,
      description: description,
      recipe_id: recipe.id,
      item_id: item.id,
      full_description: full_description,
      created_at: created_at,
      updated_at: updated_at
    }
  end
end
