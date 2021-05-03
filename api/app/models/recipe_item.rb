# frozen_string_literal: true

# Holds behaviour and data for recipe items.
class RecipeItem < ApplicationRecord
  belongs_to :recipe
  belongs_to :item

  before_save :set_multiplier_if_empty

  validates :recipe_id, :item_id, :multiplier, presence: true
  validates_numericality_of :multiplier, greater_than: 0

  private

  def set_multiplier_if_empty
    multiplier ||= 1 # rubocop:disable Lint/UselessAssignment
  end
end
