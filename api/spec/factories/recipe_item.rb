# frozen_string_literal: true

FactoryBot.define do
  factory :recipe_item do
    description { ["chopped", "toasted", "sauteed"].sample }
    multiplier { rand(0.5..5.0) }
    item { create(:item) }
    recipe { create(:recipe) }
  end
end
