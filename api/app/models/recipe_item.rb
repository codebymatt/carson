# frozen_string_literal: true

# Holds behaviour and data for recipe items.
class RecipeItem < ApplicationRecord
  belongs_to :recipe
  belongs_to :item
end
