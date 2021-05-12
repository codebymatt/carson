# frozen_string_literal: true

# Handles list functionality.
class List < ApplicationRecord
  LIST_TYPES = ["shopping"].freeze

  has_many :list_items

  validates_presence_of :name, :type
  validates :list_type, inclusion: {in: LIST_TYPES}
end
