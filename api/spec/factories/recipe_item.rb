# frozen_string_literal: true

FactoryBot.define do
  factory :recipe_item do
    description { ["chopped", "toasted", "sauteed"].sample }
    unit { "whole" }
    quantity { 1 }
    item { create(:item) }
    recipe { create(:recipe) }
  end
end
