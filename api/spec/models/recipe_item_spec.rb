# frozen_string_literal: true

require "rails_helper"

RSpec.describe RecipeItem, type: :model do
  it { is_expected.to validate_presence_of :recipe_id }
  it { is_expected.to validate_presence_of :item_id }
  it { is_expected.to validate_presence_of :multiplier }
  it { is_expected.to validate_numericality_of(:multiplier).is_greater_than(0) }
end
