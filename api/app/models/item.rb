# frozen_string_literal: true

# Base class representing items.
class Item < ApplicationRecord
  validates :name, :unit, :base_quantity, presence: true
  validates :name, uniqueness: {scope: :unit}
  validates_numericality_of :base_quantity, only_integer: true, greater_than: 0

  def serialize
    {
      id: id,
      name: name,
      unit: unit,
      base_quantity: base_quantity,
      created_at: created_at
    }
  end
end
