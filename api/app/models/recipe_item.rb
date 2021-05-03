# frozen_string_literal: true

# Holds behaviour and data for recipe items.
class RecipeItem < ApplicationRecord
  belongs_to :recipe
  belongs_to :item

  before_save :set_multiplier_if_empty

  validates :recipe_id, :item_id, :multiplier, presence: true
  validates_numericality_of :multiplier, greater_than: 0

  delegate :name, to: :item

  def full_description
    base_description = "#{quantity} #{item.unit} #{name}"
    addtional_description = description.present? ? " (#{description})" : ""

    "#{base_description}#{addtional_description}"
  end

  def serialize
    {
      id: id,
      name: name,
      multiplier: formatted_multiplier,
      description: description,
      recipe_id: recipe.id,
      full_description: full_description,
      created_at: created_at,
      updated_at: updated_at
    }
  end

  def formatted_multiplier
    (multiplier % 1).zero? ? multiplier.floor : multiplier
  end

  private

  def quantity
    multiplier * item.base_quantity
  end

  def set_multiplier_if_empty
    multiplier ||= 1 # rubocop:disable Lint/UselessAssignment
  end
end
