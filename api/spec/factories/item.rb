# frozen_string_literal: true

FactoryBot.define do
  factory :item do
    name { Faker::Food.vegetables }
    unit { "whole" }
    base_quantity { 1 }
  end
end
