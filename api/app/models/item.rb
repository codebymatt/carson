# frozen_string_literal: true

# Base class representing items.
class Item < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  def serialize
    {
      id: id,
      name: name,
      created_at: created_at
    }
  end
end
