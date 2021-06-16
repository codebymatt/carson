# frozen_string_literal: true

# Base class representing items.
class Item < ApplicationRecord
  validates :name, :unit, :base_quantity, presence: true
  validates :name, uniqueness: {scope: :unit}
  validates_numericality_of :base_quantity, only_integer: true, greater_than: 0

  def full_description
    quantity = base_quantity > 1 ? unit.pluralize : unit
    "#{base_quantity} #{quantity} #{name}"
  end

  def serialize
    {
      id: id,
      name: name,
      unit: unit,
      base_quantity: base_quantity,
      full_description: full_description,
      created_at: created_at
    }
  end
end
