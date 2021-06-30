# frozen_string_literal: true

# Base class representing items.
class Item < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  has_many :recipe_items
  before_destroy :ensure_no_associated_recipes

  def serialize
    {
      id: id,
      name: name,
      created_at: created_at
    }
  end

  private

  # TODO: Write test for this use case.
  def ensure_no_associated_recipes
    return if recipe_items.count.zero?

    errors[:base] << "There are still recipes using this item!"
    throw(:abort)
  end
end
