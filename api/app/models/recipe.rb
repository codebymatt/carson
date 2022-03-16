# frozen_string_literal: true

# Holds behaviour and data for recipes.
class Recipe < ApplicationRecord
  include CarsonModel

  validates :name, presence: true, uniqueness: true

  has_many :recipe_items

  def serialize
    serialize_basic.merge(ingredients: recipe_items.to_a.map(&:serialize))
  end

  def serialize_basic
    {
      id: id,
      name: name,
      link: link,
      servings: servings,
      calories: calories,
      created_at: created_at,
      updated_at: updated_at
    }
  end
end
