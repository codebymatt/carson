# frozen_string_literal: true

FactoryBot.define do
  sequence :vegetable do |n|
    "#{Faker::Food.vegetables}-#{n}"
  end

  factory :item do
    name { generate(:vegetable) }
    unit { "whole" }
    base_quantity { 1 }
  end
end
